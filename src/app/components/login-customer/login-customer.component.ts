import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent implements OnInit {
  result = new Subject<any>();
  loginMode: boolean = true;
  isLoading: boolean = false;
  selectedType = false;
  loginForm = {
    email: '',
    password: ''
  }
  registerForm = {
    email: '',
    password: '',
    address: '',
    name: '',
    phone: '',
    district: '',
    city: ''
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  directToLoginAdmin() {
    this.bsModalRef.hide();
    this.router.navigate(['/login-admin'])
  }

  selectForm(type) {
    this.selectedType = true;
    this.loginMode = type;
  }

  submitLogin(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.createSession(this.loginForm).subscribe(
        res => {
          this.result.next(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.isLoading = false;
          this.bsModalRef.hide();
        }, err => {
          this.alertService.error(err);
          console.error(err);
          this.isLoading = false;
        }
      )
    }
  }

  submitRegister(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.createUser(this.registerForm).subscribe(
        res => {
          this.isLoading = false;
          this.loginMode = true;
        }, err => {
          this.alertService.error(err);
          console.error(err);
          this.isLoading = false;
        }
      )
    }
  }
}
