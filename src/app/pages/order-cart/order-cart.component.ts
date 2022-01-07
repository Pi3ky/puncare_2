import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit {
  orders = {
    orders: [],
    total: 0
  };
  totalPrice = 0;
  constructor(
    private publicService: PublicService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.orders = this.publicService.orderProductValue || {};
    if (this.orders.orders && this.orders.orders.length) {
      this.spinner.show();
      this.calcTotalPrice();
    }
  }

  calcTotalPrice() {
    this.totalPrice = 0;
    this.orders.orders.forEach(ord => {
      this.totalPrice += (ord.price * ord.quantity);
    })
    this.spinner.hide();
  }

  removeProduct(product) {
    const confirmRemove = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa sản phẩm',
        message: `Bạn có chắc muốn xóa sản phẩm ${product.title} khỏi giỏ hàng?`
      }
    });
    confirmRemove.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.orders.orders = this.orders.orders.filter(prod => prod._id !== product._id);
          this.orders.total -= product.quantity;
          this.totalPrice -= (product.quantity * product.price);
          this.publicService.setOrderProductValue(this.orders);
          console.log(this.orders)
        }
      }
    )
  }
}
