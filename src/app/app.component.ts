import { Component, OnInit } from '@angular/core';
import { Response } from './http/facadeObjects/response';
import { ConfigService } from './services/config-service.service';
import { EngineService } from './services/engine.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private config:ConfigService,
    private engine: EngineService,
    private messageService: MessageService){
  }

  ngOnInit(): void {
    this.config.isMarketInitialized = false;
    this.engine.isServerInit().subscribe(res =>{
      const response = new Response().deserialize(res);
      if (response.isErrorOccurred()){
        this.config.isMarketInitialized = false;
      }
      else{
        this.config.isMarketInitialized = true;
      }
    });;
  }

  isInitialzied(){
    return this.config.isMarketInitialized;
  }


}



