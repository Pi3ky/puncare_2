import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Products } from 'src/app/common/type';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { DetailsProductComponent } from './details-product/details-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  listProducts: Products[] = [];
  totalItems = 0;
  search = {
    title: '',
    page: 1,
    page_size: 20,
    sort: '',
    dir: '',
    type_id: '',
  }
  typeProduct = [];
  constructor(
    private publicService: PublicService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getTypeProduct();
  }

  getTypeProduct(){
    this.publicService.getTypeProduct().subscribe(
      res => {
        this.typeProduct = res;
      },
      err => {
        console.error(err);
        this.alertService.error(err);
      }
    )
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

  /**
   * View selected product
   * @param product
   */
  openProduct(product: Products){
    this.modalService.show(DetailsProductComponent, {
      class: "modal-lg modal-dialog-centered",
      initialState: {
        product: product,
      }
    })
  }

  filterType(type) {
    this.search.type_id = type._id;
    this.getProducts();
  }

  changePage(page) {
    this.search.page = page.page;
    if (page.showRow) {
      this.search.page_size = page.showRow;
    }
    this.getProducts();
  }
}
