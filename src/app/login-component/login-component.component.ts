import { Component, OnInit } from '@angular/core';
import { EngineService } from 'app/services/engine.service';
import { FormControl } from '@angular/forms';
import { ConfigService } from 'app/services/config-service.service';
import { NamePasswordRequest } from 'app/http/requests/name-password-request';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { MessageService } from 'app/services/message.service';
import { ValidateSecurityRequest } from 'app/http/requests/validate-security-request';
import { MemberFacade } from 'app/http/facadeObjects/MemberFacade';
import { IsSystemManagerRequest } from 'app/http/requests/is-system-manager-request';
import { Response } from 'app/http/facadeObjects/response';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  colorControl = new FormControl('black');
  name: string;
  password: string;
  secondStep: boolean;
  title: string = 'Login';
  answers: string[];
  questions: string[];
  currentAnswer: string;
  currentQuestion: string;
  currentIndex: number;
  constructor(
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  submitLogin() {
    const request = new NamePasswordRequest();
    request.name = this.name;
    request.password = this.password;
    this.engine
      .memberLogin(request)
      .subscribe((responseJson: ResponseT<String[]>) => {
        const response = new ResponseT().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
          this.reset();
        } else {
          for (const question of response.value) {
            this.questions.push(question);
          }
          if (this.questions.length > 0) {
            this.secondStep = true;
            this.currentAnswer = "";
            this.currentQuestion = this.questions[this.currentIndex];
          } else {
            this.answers = [];
            this.validateQuestions();

          }
        }
      });
  }

  submitAnsswer(){
    this.answers.push(this.currentAnswer);
    this.currentAnswer = "";
    this.currentIndex = this.currentIndex +1;
    if (this.questions.length>this.currentIndex){
      this.currentQuestion = this.questions[this.currentIndex];
    }
    else{
      this.validateQuestions();
    }
  }

  validateQuestions() {
    const request = new ValidateSecurityRequest();
    request.answers = this.answers;
    request.visitorName = this.config.visitor.name;
    request.userName = this.name;
    this.engine
      .validateSecurityQuestions(request)
      .subscribe((responseJson: ResponseT<MemberFacade>) => {
        const response = new ResponseT().deserialize(responseJson);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
          this.reset();
        } else {
          const member: MemberFacade = new MemberFacade().deserialize(
            response.value
          );
          let dest='/rec/login/'+this.config.visitor.name +'/'+member.name;
          this.config.stompClient.publish({destination: dest}); 
          this.config.visitor.cart = member.myCart;
          this.config.visitor.name = member.name;
          this.config.member = member;
          this.config.isMemberLoggedIn = true;
          this.isManagerLoggedIn(member.name);
          this.config.isSearchItemClicked = true;
        }
      });
  }

  isManagerLoggedIn(name:string){
    const request = new IsSystemManagerRequest(name);
    this.engine.isSystemManager(request).subscribe(responseJson=>{
      const respone = new ResponseT<Boolean>().deserialize(responseJson);
      if (!respone.isErrorOccurred()){
        this.config.isManagerLoggedIn = respone.value;
      }
    })
  }
  canSubmitAnswer() {
    return this.currentAnswer && this.currentAnswer !== '';
  }

  canSubmit() {
    return (
      this.name && this.name !== '' && this.password && this.password != ''
    );
  }

  reset() {
    this.name = '';
    this.password = '';
    this.questions = [];
    this.secondStep = false;
    this.currentAnswer = '';
    this.answers = [];
    this.currentIndex = 0;
  }
}
