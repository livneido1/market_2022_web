import { Component, OnInit } from '@angular/core';
import { EngineService } from 'app/services/engine.service';
import { FormControl } from '@angular/forms';

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
  constructor(private engine: EngineService) {
    this.name="";
    this.password="";
    this.validatePassword="";
   }

  ngOnInit(): void {
  }


  canSubmit(){
    return this.name !=="" &&
      this.password !=="" &&
      this.validatePassword !=="" &&
      this.validatePassword === this.password;
  }
}
