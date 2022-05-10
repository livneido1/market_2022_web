import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private engine : EngineService,
    private config: ConfigService ) { }

  ngOnInit(): void {
  }

  logout(){
    this.config.isMemberLoggedIn = false;
    this.config.isSearchItemClicked = true;

  }

}
