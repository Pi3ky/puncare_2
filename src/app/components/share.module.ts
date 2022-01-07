import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertComponent } from './alert/alert.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCustomerComponent } from './login-customer/login-customer.component';

const E_MODULES =  [NgxPaginationModule, CarouselModule, FormsModule, ReactiveFormsModule ];
const E_COMPONENTS =  [PaginationComponent ];
@NgModule({
  declarations: [ AlertComponent, ConfirmModalComponent, PaginationComponent, LoginCustomerComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  entryComponents: [AlertComponent, ConfirmModalComponent, LoginCustomerComponent],
  exports: [...E_MODULES, ...E_COMPONENTS ],
})
export class ShareModule { }
