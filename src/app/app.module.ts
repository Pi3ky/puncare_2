import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShareModule } from './components/share.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ModalModule.forRoot(),
    ShareModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
