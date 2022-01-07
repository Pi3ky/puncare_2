import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { EditProductComponent } from './adm-products/edit-product/edit-product.component';
import { AdmServicesComponent } from './adm-services/adm-services.component';
import { EditServicesModalComponent } from './adm-services/edit-services-modal/edit-services-modal.component';

const routes: Routes = [
  { path: 'services', component: AdmServicesComponent },
  { path: 'services/add', component: EditServicesModalComponent },
  { path: 'services/:id', component: EditServicesModalComponent },

  { path: 'products', component: AdmProductsComponent },
  { path: 'products/add', component: EditProductComponent },
  { path: 'products/:id', component: EditProductComponent },
  {
    path: '',
    redirectTo: 'services',
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
