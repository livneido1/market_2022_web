import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'app/services/config-service.service';
import { EngineService } from 'app/services/engine.service';
import { MessageService } from 'app/services/message.service';
import { ModelAdapterService } from 'app/services/model-adapter.service';

@Component({
  selector: 'app-discount-main',
  templateUrl: './discount-main.component.html',
  styleUrls: ['./discount-main.component.scss']
})
export class DiscountMainComponent implements OnInit {

  constructor(
    private engine: EngineService,
    private messageService: MessageService,
    private config: ConfigService,
    private modelAdapter: ModelAdapterService
  ) { }

  ngOnInit(): void {
  }



  showItems() {
    return false;
  }

  reset(){

  }
}
