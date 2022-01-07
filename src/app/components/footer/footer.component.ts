import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { shop_address } from 'src/app/common/const';
import { PagesService } from 'src/app/pages/pages.service';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  now = new Date();
  shop_address = shop_address;
  constructor(public publicService: PublicService) { }

  ngOnInit() {
    interval(1000).subscribe(
      () => {
        this.now = new Date();
      }
    )

  }

  // getServices(){
  //   this.publicService.getServices({}).subscribe(
  //     res => {
  //       this.publicService.services = res.data;
  //     },
  //     err => {
  //       console.error(err)
  //     }
  //   )
  // }


}
