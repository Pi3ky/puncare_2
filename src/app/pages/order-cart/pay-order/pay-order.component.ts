import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss']
})
export class PayOrderComponent implements OnInit {
  shippingFee = 20000;
  payForm = {
    name: '',
    address: '',
    city: '',
    phone: '',
    district: '',
    totalPrice: 0,
    post_code: '',
    payment: 'banking',
    note: ''
  };
  arrayPayment = [
    {
      id: 'banking',
      checked: true,
      title: 'Thanh toán online qua ngân hàng'
    },
    {
      id: 'standard',
      checked: false,
      title: 'Thanh toán khi nhận hàng'
    },
  ]
  ordersList = [];
  constructor(
    private publicService: PublicService,
    private pagesService: PagesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.ordersList = this.publicService.orderProductValue.orders || [];
    this.calcTotalPrice()
  }

  calcTotalPrice() {
    this.payForm.totalPrice = 0;
    this.ordersList.forEach(ord => {
      this.payForm.totalPrice += (ord.price * ord.quantity);
    })
  }

  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.spinner.show();
      this.payForm.totalPrice += this.shippingFee;
      this.pagesService.createOrder(this.payForm).subscribe(
        res => {
          this.alertService.success('Đơn hàng đã được gửi đi!');
          this.publicService.setOrderProductValue(null);
          this.spinner.hide();
        },
        err => {
          console.error(err);
          this.alertService.error(err);
          this.spinner.hide();
        }
      )
    }
  }

  selectTypePayment(itemID) {
    this.arrayPayment.forEach(item => {
      if (item.id === itemID) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    })
  }
}
