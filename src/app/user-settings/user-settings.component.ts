import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Response } from 'app/http/facadeObjects/response';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { AddPersonalQueryRequest } from 'app/http/requests/add-personal-query-request';
import { OpenNewShopRequest } from 'app/http/requests/open-new-shop-request';
import { RequestVisitorName } from 'app/http/requests/request-visitor-name';
import { TwoStringRequest } from 'app/http/requests/two-string-request';
import { OpenNewShopDialogComponent } from 'app/open-new-shop-dialog/open-new-shop-dialog.component';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  currentAnswer: string;
  currentQuestion: string;
  shopToReOpen: string;
  constructor(
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.resetQuestion();
  }

  canAddQuestion(): boolean {
    return (
      this.currentAnswer &&
      this.currentAnswer !== '' &&
      this.currentQuestion &&
      this.currentQuestion !== ''
    );
  }
  addQuestion() {
    const request = new AddPersonalQueryRequest();
    request.member = this.config.member.name;
    request.userAdditionalAnswers = this.currentAnswer;
    request.userAdditionalQueries = this.currentQuestion;
    this.engine
      .addPersonalQuery(request)
      .subscribe((responseJson: Response) => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage('Succesfully added question!');
          this.resetQuestion();
        }
      });
  }

  logout() {
    const request = new RequestVisitorName();
    request.name = this.config.member.name;
    this.engine
      .logout(request)
      .subscribe((responseJson: ResponseT<VisitorFacade>) => {
        const response = new ResponseT().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else{
          const visitor = new VisitorFacade().deserialize(response.value);
          this.config.isMemberLoggedIn = false;
          this.config.member = undefined;
          this.config.visitor = visitor;
          this.config.isSearchItemClicked = true;
          this.messageService.validMessage('succesfully logged out!');
        }
      });
  }

  openNewShop() {
    const dialogRef = this.dialog.open(OpenNewShopDialogComponent, {
      width: '250px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const shopName = result;
      const request = new OpenNewShopRequest();
      request.shopName = shopName;
      request.memberName = this.config.visitor.name;
      this.engine.openNewShop(request).subscribe((responseJson) => {
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage(
            'successfully Opened new Shop! Good Luck'
          );
        }
      });
    });
  }

  canReOpenShop(){
    if (this.shopToReOpen){
      return this.shopToReOpen !== "";
    }
    return false;
  }

  reOpenShop(){
    if (this.shopToReOpen){
      const request = new TwoStringRequest(this.config.visitor.name, this.shopToReOpen);
      this.engine.reOpenClosedShop(request).subscribe(responseJson =>{
        const response = new Response().deserialize(responseJson);
        if (response.isErrorOccurred()){
          this.messageService.errorMessage(response.getMessage());
          return;
        }
        else{
          this.messageService.validMessage("succesfully reopen shop!");
          this.shopToReOpen = undefined;
        }
      })
    }
  }

  resetQuestion() {
    this.currentAnswer = '';
    this.currentQuestion = '';
  }
}
