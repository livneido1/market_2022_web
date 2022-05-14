import { Component, OnInit } from '@angular/core';
import { EngineService } from 'app/services/engine.service';
import { FormControl } from '@angular/forms';
import { ConfigService } from 'app/services/config-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  colorControl = new FormControl('black')
  name:string;
  password:string;
  validatePassword:string;
  title:string = "Login";
  constructor(
    private engine: EngineService,
    private config: ConfigService
    ) {
    this.name="";
    this.password="";
    this.validatePassword="";
   }

  ngOnInit(): void {
  }


  submitLogin(){
    this.config.isSearchItemClicked = true;
    this.config.isMemberLoggedIn = true;
    // this.config.visitor = "Ayala";
  }

  canSubmit(){
    return true;
    return this.name !=="" &&
      this.password !=="" &&
      this.validatePassword !=="" &&
      this.validatePassword === this.password;
  }
}
