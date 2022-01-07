import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiKeyTiny, typeProduct } from 'src/app/common/const';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId: string;
  apiKey = apiKeyTiny;
  config = {
    height: 400,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic | \ alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  }
  typeProduct = typeProduct;
  product = {
    title: '',
    image: '',
    type: null,
    price: '',
    details: '',
  };
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService,
    public publicService: PublicService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProduct();
    }
  }

  getProduct() {
    this.spinner.show();
    this.publicService.getProductsDetail(this.productId).subscribe(
      res => {
        this.product = res;
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
        this.alertService.error(err);
      }
    );
  }

  createProduct() {
    this.spinner.show();
    this.adminService.createProduct(this.product).subscribe(
      res => {
        this.alertService.success('Thêm mới thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Thêm mới thất bại!');
      }
    )
  }


  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      if (this.productId) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    }
  }

  updateProduct() {
    this.spinner.show();
    this.adminService.updateProduct(this.productId, this.product).subscribe(
      res => {
        this.alertService.success('Cập nhật thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Cập nhật thất bại!');
      }
    )
  }

}
