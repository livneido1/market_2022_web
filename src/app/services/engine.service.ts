import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseT } from 'app/http/facadeObjects/response-t';
import { VisitorFacade } from 'app/http/facadeObjects/visitor-facade';
import { catchError, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class EngineService {
  private serverUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  register(request: string): Observable<string> {
    return this.http.post<string>('/register', request, httpOptions);
  }

  guestLogin():Observable<ResponseT<VisitorFacade>>{
    return this.http.post<ResponseT<VisitorFacade>>(this.serverUrl + "/guestLogin" , httpOptions);
  }
}
