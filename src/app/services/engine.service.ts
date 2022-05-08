import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient, private headers: HttpHeaders) {}

  register(request: string): Observable<string> {
    return this.http.post<string>('/register', request, httpOptions);
  }

  guestLogin():Observable<any>{
    return this.http.post<any>(this.serverUrl + "/guestLogin" , httpOptions)
  }
}
