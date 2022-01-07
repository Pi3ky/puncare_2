import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      console.log(message);
      switch (message && message.type) {
        case "success":
          // this.toastr.success(message.text, 'Successfully!', message.option);
          break;
        case "error":
          // this.toastr.error(message.text, 'Error!', message.option);
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
