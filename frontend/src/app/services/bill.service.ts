import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private url: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  generateReport(data: any) {
    return this.httpClient.post(`${this.url}/bill/generateBill`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  getPdf(data: any = {}):Observable<Blob> {
    return this.httpClient.post(`${this.url}/bill/getBills`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),responseType:'blob' });
  }
}
