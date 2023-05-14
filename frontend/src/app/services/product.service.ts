import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  add(data: any) {
    return this.httpClient.post(`${this.url}/product/add`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  update(data: any) {
    return this.httpClient.post(`${this.url}/product/update`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  get(data: any = {}) {
    return this.httpClient.post(`${this.url}/product/get`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  delete(data: any) {
    return this.httpClient.post(`${this.url}/product/delete`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
