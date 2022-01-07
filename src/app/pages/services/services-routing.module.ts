import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsServiceComponent } from './details-service/details-service.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent
  },
  {
    path: ':id',
    component: DetailsServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
