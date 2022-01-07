import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ShareModule } from 'src/app/components/share.module';

@NgModule({
  declarations: [ProductsComponent, DetailsProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ShareModule,
    ModalModule.forRoot(),
  ]
})
export class ProductsModule { }
