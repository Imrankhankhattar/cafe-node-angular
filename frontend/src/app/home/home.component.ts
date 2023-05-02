import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private dialog:MatDialog,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.validateToken().subscribe((res: any) => {
      this.router.navigate(['/cafe/dashboard'])
    }, (error: any) => {
    });
  }
  signUp() {
   const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    this.dialog.open(SignupComponent, dialogConfig);
  }
  forgotPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
  login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="40%";
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
