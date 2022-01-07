import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createSession(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/users/login`, body);
  }

  logout(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/users/logout`, body);
  }

  createUser(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/api/users/create`, body)
  }
}
