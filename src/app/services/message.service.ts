import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }



  errorMessage(message:string , action?:string, duration?:number){
    const act: string  = action? action : "Got It!";
    const dur: number  = duration? duration : 2000;
    this.snackBar.open(message, act , {
      duration : dur,
      panelClass: ['mat-toolbar', 'mat-warn']
    })
  }

  validMessage(message:string , action?:string, duration?:number){
    const act: string  = action? action : "Got It!";
    const dur: number  = duration? duration : 2000;
    this.snackBar.open(message, act , {
      duration : dur,
      panelClass: ['mat-toolbar', 'mat-accent']
    })
  }
}
