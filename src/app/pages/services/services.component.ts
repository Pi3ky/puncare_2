import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { shop_address } from 'src/app/common/const';
import { Services } from 'src/app/common/type';
import { AlertService } from 'src/app/services/alert.service';
import { PublicService } from 'src/app/services/public.service';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
  }
  search = {
    title: '',
    sort: '',
    dir: '',
    page: 1,
    page_size: 6
  }
  contactForm: FormGroup;
  totalItems = 0;
  shop_address = shop_address;
  constructor(
    public pageService: PagesService,
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      service: [null],
      date_visit: [new Date()],
      time_visit: [null],
      msg: ['']
    });
   }

  ngOnInit() {
    this.getServices();
  }

  /**
   * Get data services
   */
  getServices(){
    this.spinner.show();
    this.publicService.getServices(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
      }
    )
  }

  /**
   * View selected service
   * @param service
   */
  openService(service: Services){
    console.log(service._id);
    this.router.navigate(['/pages/services', service._id])
  }

  /**
   * Select services
   */
  selectService(evt: Services){
    console.log(evt)
  }

  onSubmit(contactForm){

    // this.alertService.error('Win')

    if(contactForm.invalid){
      this.markFormGroupTouched(contactForm)
      return;
    } else {
      this.spinner.show();
      const body = {
        ...contactForm.value,
        date_visit: new Date(contactForm.value.date_visit).getTime()
      }
      console.log(body)
      this.pageService.sendContact(body).pipe(finalize(() => this.spinner.hide())).subscribe(
        res => {
          // this.
        }
      )
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
  */
   private markFormGroupTouched(formGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  changePage(evt) {
    this.search.page = evt.page;
    this.getServices();
  }
}
