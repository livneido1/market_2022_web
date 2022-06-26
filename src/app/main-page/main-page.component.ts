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
import { RxStomp } from '@stomp/rx-stomp';
import { map } from 'rxjs';
import { StatisticsData } from 'app/http/facadeObjects/StatisticsData';
import { ComponentFixtureNoNgZone } from '@angular/core/testing';

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
        this.config.isManagerLoggedIn = false;
        const visitor = new VisitorFacade().deserialize(response.value);
        this.config.visitor = visitor;
        console.log('returned from guest login');
        if (this.config.visitor) {
          if (this.config.visitor.name.length == 0) {
            this.config.visitor.name = 'BarTestName';
          }
          this.connectToNotifications(this.config.visitor.name);
        }
      }
    });
  }

  isSubDiscountClicked(): boolean {
    return this.config.isSubDiscountClicked;
  }

  connectToNotifications(name: string): void {
    console.log('connect to the notifications socket');
    //create the cocket using the enpoint configurations.
    console.log(this.config.serverUrl + '/notifications');
    //creating the stomp protocol for the ws connectiong
    this.config.stompClient = new RxStomp();
    this.config.stompClient.configure({
      webSocketFactory: () =>
        new SockJS(this.config.serverUrl + '/notifications'),
      debug: (msg: string) => console.log(msg),
    });
    this.config.stompClient.activate();
    this.watchForNotifications();
    this.startClient(name);
    console.log('connected');
    //connect the Rserver via ws and subscribe for notifications.
  }
  startClient(name: string) {
    if (this.config.stompClient && this.config.stompClient.connected) {
      this.config.stompClient.publish({ destination: '/rec/start/' + name });
    }
    console.log('start request sended');
  }
  watchForNotifications() {
    this.config.stompClient
      .watch('/user/notification/item')
      .pipe(
        map((response) => {
          const text: string = response.body;
          return text;
        })
      )
      .subscribe((notification: string) => {
        const statistics = new StatisticsData().deserialize(notification);
        if (statistics.numOfVisitors) {
          this.config.currentStatistics = statistics;
        } else {
          alert(notification);
        }
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
  isDiscountMainClicked() {
    return this.config.isMainDiscountClicked;
  }
  isNewDiscountClicked() {
    return this.config.isAddNewDiscountClicked;
  }
  isMainPurcahsePolicyClicked() {
    return this.config.isMainPurcahsePolicyClicked;
  }
  isAddNewPurchasePolicyClicked() {
    return this.config.isAddNewPurchasePolicyClicked;
  }
  isSubPurchasePolicyClicked() {
    return this.config.isSubPurchasePolicyClicked;
  }
  isManagerSettingsClicked() {
    return this.config.isManagerSettingsClicked;
  }
  isPendingBidsClicked() {
    return this.config.isPendingBidsClicked;
  }

  ngOnDestroy(): void {
    const request = new ExitSystemRequest();
    request.visitorName = this.config.visitor.name;
    this.engine.exitSystem(request).subscribe((responseJson) => {
      const response = new Response().deserialize(responseJson);
      //remove visitor from the server listeners
      //disconnect from the ws connection.
      this.stopClient(this.config.visitor.name);
    });
  }
  stopClient(name: string) {
    if (this.config.stompClient && this.config.stompClient.connected) {
      this.config.stompClient.publish({ destination: '/rec/stop/' + name });
      this.config.stompClient.deactivate();
      this.config.stompClient = null;
      console.log('closed web socket connection');
    }
  }
}
