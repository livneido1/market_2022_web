import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out-component',
  templateUrl: './check-out-component.component.html',
  styleUrls: ['./check-out-component.component.scss']
})
export class CheckOutComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  canSubmit(){
    return true;
  }
}
