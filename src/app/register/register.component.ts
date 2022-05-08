import { Component, OnInit } from '@angular/core';
import { EngineService } from 'app/services/engine.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name:string;
  password:string;
  validatePassword:string;
  title:string = "Register";
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

  submit(){

  }

}
