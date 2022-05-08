import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(
    private http : HttpClientModule,
    private headers: HttpHeaders,
    ) { }



    
  
}
