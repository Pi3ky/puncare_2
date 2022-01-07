import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Products } from 'src/app/common/type';
import { PublicService } from 'src/app/services/public.service';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {
  product: Products = {
    _id: '',
    currency: '',
    image: '',
    price: 0,
    weight: '',
    status: '',
    quantity_sold: 0,
    rate: 0,
    title: '',
    type_id: '',
    type_name: ''
  };
  orderProducts = {
    orders: [],
    total: 0
  }
  submitted = false;
  selectedProduct = {
    title: '',
    quantity: 1,
    _id: '',
    size: '',
    image: '',
    price: 0
  }
  constructor(
    public pageService: PagesService,
    public bsModalRef: BsModalRef,
    public publicService: PublicService,
  ) { }

  ngOnInit() {
    this.publicService.orderProductsObj.subscribe(
      res => {
        if (res) {
          this.orderProducts = res;
        }
      }
    )
    if (this.product) {
      Object.keys(this.selectedProduct).map(key => {
        if (key === 'size') {
          this.selectedProduct.size = this.product.weight || '';
        } else if (key === 'quantity') {
          this.selectedProduct.quantity = 1;
        } else {
          this.selectedProduct[key] = this.product[key];
        }
      })
    }
  }

  submit(form) {
    form.control.markAllAsTouched();
    this.submitted = true;
    if (form.valid && this.selectedProduct.quantity > 0) {
      const selected = this.orderProducts.orders.find(order => order._id === this.selectedProduct._id);
      this.orderProducts.total += this.selectedProduct.quantity;
      if (selected) {
        this.orderProducts.orders.forEach(order => {
          if (order._id === this.selectedProduct._id) {
            order.quantity += this.selectedProduct.quantity;
          }
        })
      } else {
        this.orderProducts.orders.push(this.selectedProduct);
      }
      this.publicService.setOrderProductValue(this.orderProducts);
      this.bsModalRef.hide();
    }
  }

}
