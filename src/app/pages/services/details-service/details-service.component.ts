import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PagesService } from '../../pages.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PublicService } from 'src/app/services/public.service';
@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss']
})
export class DetailsServiceComponent implements OnInit {
  tabView = 'about';
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
  }
  bookingForm = {
    name: "",
    phone: "",
    date_visit: "",
    time_visit: null,
    service: ""
  };
  service: Services;
  constructor(
    private route: ActivatedRoute,
    public pageService: PagesService,
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
  ) {

   }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.publicService.getServiceDetail(id))
    ).subscribe(service => {
      this.service = service;
      this.bookingForm.service = this.service._id;
      this.getServices();
    })
  }

  getDefaultForm(){
    return {
      name: "",
      phone: "",
      email: "",
      date_visit: "",
      time_visit: null,
      service: this.service._id
    }
  }

  changeView(type){
    this.tabView = type;
  }

  /**
   * Get data services
   */
  getServices(){
    this.publicService.getServices({}).subscribe(
      res => {
        this.listServices = res.data;
      }
    )
  }

  submitBooking(form){
    this.spinner.show();
    if (this.bookingForm.date_visit) {
      this.bookingForm.date_visit = moment(this.bookingForm.date_visit).format("DDMMYYYY");
    }
    console.log(this.bookingForm)
    this.bookingForm = this.getDefaultForm();
    form.reset();
  }

}
