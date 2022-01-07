import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from '../common/const';
import { Services } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public services: Services[] = [];
  private orderProductSbj: BehaviorSubject<any>;
  public orderProductsObj: Observable<any>;
  STORAGE_KEY = 'orders';
  constructor(private http: HttpClient) {
    this.orderProductSbj = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(this.STORAGE_KEY)));
    this.orderProductsObj = this.orderProductSbj.asObservable();
  }

  public get orderProductValue(): any {
    return this.orderProductSbj.value;
  }

  public setOrderProductValue(order) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(order));
    this.orderProductSbj.next(order);
  }

  getServices(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services`, {params: param});
  }

  getServiceDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services/${id}`)
  }

  getProducts(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products`, {params: param});
  }

  getProductsDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products/${id}`);
  }

  getTypeProduct(): Observable<any> {
    return this.http.get<any>(`${urlApi}/api/types`);
  }
}
