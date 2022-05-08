import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
  }



  isRegisterClicked(): boolean{
    return this.config.isRegisterClicked;
  }
}
