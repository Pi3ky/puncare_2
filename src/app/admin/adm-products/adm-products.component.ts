import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.scss']
})
export class AdmProductsComponent implements OnInit {

  sortName = 0;
  sortPrice = 0;
  totalItems = 0;
  search = {
    title: '',
    page: 1,
    page_size: 10,
    sort: '',
    dir: '',
    type_name: '',
  }
  listType = [
    {id: '', name: 'Tất cả'},
    {id: 'toy', name: 'Đồ chơi'},
    {id: 'food', name: 'Ăn uống'},
  ]
  listProducts = [];
  constructor(
    private publicService: PublicService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.spinner.show();
    this.publicService.getProducts(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listProducts = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
        this.alertService.error(err);
      }
    )
  }

  sortByTitle() {
    this.search.sort = 'title';
    this.sortPrice = 0;
    if (this.sortName === 0) {
      this.sortName = 1;
      this.search.dir = 'asc';
    } else if (this.sortName === 1) {
      this.sortName = 2;
      this.search.dir = 'decr';
    } else if (this.sortName === 2) {
      this.sortName = 0;
      this.search.dir = '';
    }
    this.getProducts();
  }

  sortByPrice() {
    this.search.sort = 'price';
    this.sortName = 0;
    if (this.sortPrice === 0) {
      this.sortPrice = 1;
      this.search.dir = 'asc';
    } else if (this.sortPrice === 1) {
      this.sortPrice = 2;
      this.search.dir = 'decr';
    } else if (this.sortPrice === 2) {
      this.sortPrice = 0;
      this.search.dir = '';
    }
    this.getProducts();
  }

  editProduct(product){
    this.router.navigate(['/admin/products', product._id])
  }

  removeProduct(product){
    const confirmRemove = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa sản phẩm',
        message: `Bạn có chắc muốn xóa sản phẩm ${product.title}`
      }
    });
    confirmRemove.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          this.adminService.removeProduct(product._id).subscribe(
            res => {
              this.spinner.hide();
              this.alertService.success('Xóa sản phẩm thành công!');
              this.getProducts();
            },
            err => {
              this.spinner.hide();
              this.alertService.success('Xóa sản phẩm thất bại!');
            }
          )
        }
      }
    )
  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getProducts();
  }

}
