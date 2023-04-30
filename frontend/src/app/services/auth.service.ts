import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router){ }
  isAuthenticated():Boolean{
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/']);
      return false
    }
    return true;
  }
}
