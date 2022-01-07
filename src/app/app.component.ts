import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AlertService } from './services/alert.service';
import { PublicService } from './services/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private permissionsService: NgxPermissionsService,
    public publicService: PublicService,
    private alertService: AlertService,
  ){
    if (!this.publicService.services.length) {
      this.getServices();
    }
  }

  getServices(){
    if (!this.publicService.services || (this.publicService.services && !this.publicService.services.length)) {
      this.publicService.getServices({}).subscribe(
        res => {
          this.publicService.services = res.data;
        },
        err => {
          console.error(err);
          this.alertService.error(err)
        }
      )
    }
  }
}
