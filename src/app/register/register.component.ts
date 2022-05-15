import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeesComponentComponent } from 'app/employees-component/employees-component.component';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { NamePasswordRequest } from 'app/http/requests/name-password-request';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string;
  password: string;
  validatePassword: string;
  title: string = 'Register';
  constructor(
    private engine: EngineService,
    private config: ConfigService,
    private messageService: MessageService
  ) {
    this.name = '';
    this.password = '';
    this.validatePassword = '';
  }

  ngOnInit(): void {}

  validateSamePassword(): boolean {
    return this.password && this.password === this.validatePassword;
  }
  canSubmit() {
    return (
      this.name !== '' && this.password !== '' && this.validatePassword !== ''
    );
  }

  submit() {
    if (this.validateSamePassword()) {
      const request = new NamePasswordRequest();
      request.name = this.name;
      request.password = this.password;
      this.engine.register(request).subscribe((res) => {
        const response = new ResponseT().deserialize(res);
        if (response.isErrorOccurred()) {
          this.messageService.errorMessage(response.getMessage());
        } else {
          this.messageService.validMessage('Registered succesfully');
        }
      });
    } else {
      this.messageService.errorMessage("Passwords isn't same");
    }
  }
}
