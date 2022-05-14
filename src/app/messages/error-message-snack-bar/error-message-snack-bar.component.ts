import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-message-snack-bar',
  templateUrl: './error-message-snack-bar.component.html',
  styleUrls: ['./error-message-snack-bar.component.scss']
})
export class ErrorMessageSnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {}

  
  ngOnInit(): void {
  }


  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
