import { Services } from './../common/type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  public readonly schedules = [
    { id: "morning", name: "Buổi sáng (8h00 - 11h30)" },
    { id: "afternoon", name: "Buổi chiều (13h00 - 17h00)" },
    { id: "evening", name: "Buổi tối (18h00 - 20h30)" }
  ]
  constructor(private http: HttpClient) { }

  sendContact(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/email-contact`, body)
  }

  createOrder(body):Observable<any> {
    return this.http.post<any>(`${urlApi}/api/orders/create`, body);
  }

}
