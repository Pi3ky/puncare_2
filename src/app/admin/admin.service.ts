import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  updateService(id, body): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/services/${id}`, body);
  }

  removeService(id): Observable<any>{
    return this.http.delete<any>(`${urlApi}/api/services/${id}`);
  }

  createService(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/services/create`, body);
  }

  removeProduct(id): Observable<any>{
    return this.http.delete<any>(`${urlApi}/api/products/${id}`);
  }

  updateProduct(id, body): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/products/${id}`, body);
  }

  createProduct(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/products/create`, body);
  }
}
