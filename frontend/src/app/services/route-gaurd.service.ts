import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) { }
  canActivate(route: ActivatedRouteSnapshot) {
    let roles = route.data.expectedRole;
    const token: any = localStorage.getItem('token');
    var tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token);
    } catch (error) {
      localStorage.clear()
      this.router.navigate(['/'])
    }
    let roleTruthy = false
    for (let index = 0; index < roles.length; index++) {
      if (roles[index] === tokenPayload.role) {
        roleTruthy = true
      }

    }
    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.authService.isAuthenticated() && roleTruthy) {
        return true;
      }
      this.router.navigate(['/']);
      this.snackbarService.openSnackBar('You are not authorized to access this page', 'error');
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false
    }
  }
}

