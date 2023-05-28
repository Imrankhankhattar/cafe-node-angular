import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  signup(data:any){
    return this.httpClient.post(`${this.url}/user/signup`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  forgotPassword(data:any){
    return this.httpClient.post(`${this.url}/user/forgot-password`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});

  }
  login(data:any){
    return this.httpClient.post(`${this.url}/user/login`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  validateToken(){
    return this.httpClient.get(`${this.url}/user/validate-token`);
  }
  changePassword(data:any){
    return this.httpClient.post(`${this.url}/user/update-password`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  getUsers(data:any={}){
    return this.httpClient.post(`${this.url}/user/get-users`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  update(data:any={}){
    return this.httpClient.post(`${this.url}/user/update`,data,{headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
