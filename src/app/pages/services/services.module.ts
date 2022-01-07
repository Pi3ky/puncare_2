import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { ServicesRoutingModule } from './services-routing.module';
import { DetailsServiceComponent } from './details-service/details-service.component';
import { ServicesComponent } from './services.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareModule } from 'src/app/components/share.module';
@NgModule({
  declarations: [DetailsServiceComponent, ServicesComponent],
  imports: [
    CommonModule,
    ShareModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
