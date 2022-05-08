import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config-service.service';

@Component({
  selector: 'app-init-market',
  templateUrl: './init-market.component.html',
  styleUrls: ['./init-market.component.scss']
})
export class InitMarketComponent implements OnInit {

  constructor(private config:ConfigService) { }

  ngOnInit(): void {
  }

  init(){
    this.config.isMarketInitialized = true;
  }

}
