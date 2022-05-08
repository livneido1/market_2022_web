import { Component, OnInit } from '@angular/core';

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
  constructor() {
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
