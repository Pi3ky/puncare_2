import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PublicService } from 'src/app/services/public.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { AdminService } from '../admin.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-adm-services',
  templateUrl: './adm-services.component.html',
  styleUrls: ['./adm-services.component.scss']
})
export class AdmServicesComponent implements OnInit {
  listServices: Services[] = [];
  search = {
    title: '',
    sort: '',
    dir: ''
  }
  sortName = 0;
  sortPrice = 0;
  totalItems = 0;
  constructor(
    private publicService: PublicService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router,
    private adminService: AdminService,
    private alertService: AlertService,
  ) { }

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

  sortByPrice() {
    this.search.sort = 'price';
    this.sortName = 0;
    if (this.sortPrice === 0) {
      this.sortPrice = 1;
      this.search.dir = 'asc';
    } else if (this.sortPrice === 1) {
      this.sortPrice = 2;
      this.search.dir = 'decr';
    } else if (this.sortPrice === 2) {
      this.sortPrice = 0;
      this.search.dir = '';
    }
    this.getServices();
  }

  sortByTitle() {
    this.search.sort = 'title';
    this.sortPrice = 0;
    if (this.sortName === 0) {
      this.sortName = 1;
      this.search.dir = 'asc';
    } else if (this.sortName === 1) {
      this.sortName = 2;
      this.search.dir = 'decr';
    } else if (this.sortName === 2) {
      this.sortName = 0;
      this.search.dir = '';
    }
    this.getServices();
  }

  editService(service: Services) {
    this.router.navigate(['/admin/services', service._id])
  }

  removeService(service) {
    const confirmRemove = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Xóa dịch vụ',
        message: `Bạn có chắc muốn xóa dịch vụ ${service.title}`
      }
    });
    confirmRemove.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          this.adminService.removeService(service._id).subscribe(
            res => {
              this.spinner.hide();
              this.alertService.success('Xóa dịch vụ thành công!');
              this.getServices();
            },
            err => {
              this.spinner.hide();
              this.alertService.success('Xóa dịch vụ thất bại!');
            }
          )
        }
      }
    )
  }

}
