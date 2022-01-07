import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { apiKeyTiny } from 'src/app/common/const';
import { PublicService } from 'src/app/services/public.service';
import { AdminService } from '../../admin.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-edit-services-modal',
  templateUrl: './edit-services-modal.component.html',
  styleUrls: ['./edit-services-modal.component.scss']
})
export class EditServicesModalComponent implements OnInit {
  service = {
    title: '',
    description: '',
    image: '',
    price: '',
    about: '',
    details: '',
    time: ''
  };
  apiKey = apiKeyTiny;
  config = {
    height: 400,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic | \ alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  }

  serviceId: string;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertService: AlertService,
    public publicService: PublicService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId) {
      this.getService();
    }
  }

  getService() {
    this.spinner.show();
    this.publicService.getServiceDetail(this.serviceId).subscribe(
      res => {
        this.service = res;
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
        this.alertService.error(err);
      }
    );
  }

  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      if (this.serviceId) {
        this.updateService();
      } else {
        this.createService();
      }
    }
  }

  createService() {
    this.spinner.show();
    this.adminService.createService(this.service).subscribe(
      res => {
        this.alertService.success('Thêm mới thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Thêm mới thất bại!');
      }
    )
  }

  updateService() {
    this.spinner.show();
    this.adminService.updateService(this.serviceId, this.service).subscribe(
      res => {
        this.alertService.success('Cập nhật thành công!');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertService.error('Cập nhật thất bại!');
      }
    )
  }
}
