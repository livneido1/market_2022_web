import { Component, OnInit } from '@angular/core';
import { Response } from 'app/http/facadeObjects/response';
import { InitMarketRequest } from 'app/http/requests/init-market-request';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ConfigService } from '../services/config-service.service';

@Component({
  selector: 'app-init-market',
  templateUrl: './init-market.component.html',
  styleUrls: ['./init-market.component.scss']
})
export class InitMarketComponent implements OnInit {

  name :string;
  password: string;
  validatePassword: string;

  constructor(
    private config:ConfigService,
    private engine: EngineService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.name = "";
    this.password = "";
    this.validatePassword = "";
  }

  init(){
    if (this.validateSamePassword()){
      const request = new InitMarketRequest(this.name,this.password);
      this.engine.firstInitMarket(request).subscribe(res =>{
        const response = new Response().deserialize(res);
        if (response.isErrorOccurred()){
          this.messageService.errorMessage(response.getMessage());
        }
        this.messageService.validMessage("Succesfully Initialzed!");
        this.config.isMarketInitialized = true;
      })

    }
    else{
      this.messageService.errorMessage("Passwords isn't same");
    }
  }



  validateSamePassword(): boolean {
    return this.password && this.password === this.validatePassword;
  }
  canSubmit() {
    return (
      this.name !== '' && this.password !== '' && this.validatePassword !== ''
    );
  }


}
