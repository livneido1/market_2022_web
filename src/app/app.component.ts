import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { isSubscription } from 'rxjs/internal/Subscription';
import { ConfigService } from './services/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private config:ConfigService){
  }

  ngOnInit(): void {
  }

  isInitialzied(){
    return this.config.isMarketInitialized;
  }


}



