import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';

@Component({
  selector: 'app-employees-component',
  templateUrl: './employees-component.component.html',
  styleUrls: ['./employees-component.component.scss']
})
export class EmployeesComponentComponent implements OnInit {


  data = [
    { id: 1, name: 'Raz', email: "123@gmail.com" },
    { id: 2, name: 'Ayala', email: "123@gmail.com" },
    { id: 3, name: 'Shaked', email: "123@gmail.com" },
    { id: 4, name: 'Raz', email: "123@gmail.com" },
    { id: 5, name: 'Cheese', email: "123@gmail.com" },
    { id: 5, name: 'water', email: "123@gmail.com" },
    { id: 5, name: 'Cola', email: "123@gmail.com" },
    { id: 5, name: 'Salami', email: "123@gmail.com" },
    { id: 5, name: 'Flour', email: "123@gmail.com" },
    { id: 5, name: 'Pita', email: "123@gmail.com" },
  ];
  constructor(
    private config: ConfigService,
    private engine: EngineService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

}
