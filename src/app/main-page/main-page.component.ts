import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { Response } from 'app/http/facadeObjects/response';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { ExitSystemRequest } from 'app/http/requests/exit-system-request';
import { EngineService } from 'app/services/engine.service';
import { ConfigService } from '../services/config-service.service';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(private config: ConfigService, private engine: EngineService) {}

  ngOnInit(): void {
    this.engine.guestLogin().subscribe((responseJson) => {
      const response = new ResponseT<VisitorFacade>().deserialize(responseJson);
      if (response.isErrorOccurred()) {
        console.log(response.getMessage());
      } else {
        const visitor = new VisitorFacade().deserialize(response.value);
        this.config.visitor = visitor;
        console.log("returned from guest login");
        this.connectToNotifications(visitor.name);

      }
    });
  }


  
  otify(message: string): void {
    //todo: show to the client.
    window.alert(message);
    }
    connectToNotifications(name:string): void {
    console.log("connect to the notifications socket");
    let socket= new SockJS(this.config.serverUrl+ '/notification')
    this.config.stompClient=Stomp.over(socket);
    this.config.stompClient.connect({},function(frame){
    console.log("connect to server "+frame);
    this.config.stompClient.subscribe("/topic/messages/"+name, function (response){
    let data = JSON.parse(response.body);
    console.log(data);
    this.notify(data.text);
    });
    });

    }


  isRegisterClicked(): boolean {
    return this.config.isRegisterClicked;
  }

  isSearchItemClicked(): boolean {
    return this.config.isSearchItemClicked;
  }
  isLoginClicked(): boolean {
    return this.config.isLoginClicked;
  }

  isShoppingCartInfoClicked() {
    return this.config.isCartInfoClicked;
  }

  isCheckoutClicked() {
    return this.config.isCheckOutClicked;
  }

  isUserSettingClicked() {
    return this.config.isUserSettingClicked;
  }

  isShopInfoClicked() {
    return this.config.isShopInfoClicked;
  }

  isEmployeesClicked() {
    return this.config.isEmployeesinfoClicked;
  }

  ngOnDestroy(): void {
    const request = new ExitSystemRequest();
    request.visitorName = this.config.visitor.name;
    this.engine.exitSystem(request).subscribe(responseJson =>{
      const response = new Response().deserialize(responseJson);
      this.config.stompClient.disconnect();
    });
  }
}
