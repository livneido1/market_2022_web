import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeesComponentComponent } from 'app/employees-component/employees-component.component';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { NamePasswordRequest } from 'app/http/requests/name-password-request';
import { ConfigService } from 'app/services/config-service.service';
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
  constructor(
    private engine: EngineService,
    private config: ConfigService,
    private snackBar: MatSnackBar ) {
    this.name="";
    this.password="";
    this.validatePassword="";
   }

  ngOnInit(): void {

  }


  validateSamePassword(): boolean{
    return this.password && this.password === this.validatePassword;
  }
  canSubmit(){
    return this.name !=="" &&
      this.password !=="" &&
      this.validatePassword !=="" ;
  }

  submit(){
    if (this.validateSamePassword()){
      const request = new NamePasswordRequest();
      request.name  = this.name;
      request.password = this.password;
      this.engine.register(request).subscribe(( res)=>{
        const response = new ResponseT().deserialize(res);
        if (response.isErrorOccurred()){
          this.snackBar.open(response.getMessage(), "Got It!" , {
            duration : 2000,
            panelClass: ['mat-toolbar', 'mat-warn']
          })
        }

        else {
          this.snackBar.open("Registered succesfully", "Got It!" , {
            duration : 2000,
            panelClass: ['mat-toolbar', 'mat-accent']
          })        }
      })

    }
    else{
      this.snackBar.open("Passwords isn't same" , "Got It!", {
        duration : 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  }

}
