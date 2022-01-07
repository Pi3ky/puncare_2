import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth-services.service';
import { PublicService } from 'src/app/services/public.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { LoginCustomerComponent } from '../login-customer/login-customer.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollDown = false;
  currentUser;
  orderProducts;
  constructor(
    public publicService: PublicService,
    private modalService: BsModalService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.orderProducts = this.publicService.orderProductValue;
    console.log(this.orderProducts)
    fromEvent(document, 'scroll').subscribe(
      res => {
        const croodY = window.scrollY;
        if(croodY === 0){
          this.scrollDown = false;
        } else {
          this.scrollDown = true;
        }
      }
    )
  }

  directToLogin() {
    const modalLogin = this.modalService.show(LoginCustomerComponent, {
      class: "modal-md modal-dialog-centered",
    });

    modalLogin.content.result.subscribe(
      result => {
        if (result) {
          this.currentUser = result;
        }
      }
    )
  }

  logout() {
    const confirmLogout = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Đăng xuất tài khoản',
        message: `Đăng xuất sẽ khiến các thông tin lưu trữ của bạn bị xóa. Bạn có chắc?`
      }
    });
    confirmLogout.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          const body = {
            _id: this.currentUser._id,
            token: localStorage.getItem('token')
          }
          this.authService.logout(body).subscribe(
            res => {
              this.currentUser = null;
              localStorage.removeItem('user');
              this.spinner.hide();
            },
            err => {
              this.spinner.hide();
              this.alertService.success(err);
            }
          )
        }
      }
    )
  }

}
