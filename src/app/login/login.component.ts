import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = {
    email: '',
    password: ''
  }
  back_url: string;
  constructor() { }

  ngOnInit() {
    this.back_url = sessionStorage.getItem('BACK_ROUTER') || '';
    console.log(this.back_url)
  }

  submit(form) {
    form.control.markAllAsTouched();
    console.log(form)
  }

}
