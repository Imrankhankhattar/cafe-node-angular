import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 changePasswordForm:any = FormGroup;
 responseMessage:any;
 token:any = localStorage.getItem('token');
 userData:any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null,Validators.required],
      newPassword: [null,Validators.required],
      confirmPassword: [null,Validators.required]
    });
    this.userData = jwt_decode(this.token);
  }
  handleSubmit(){
    this.ngxService.start();
    const Data = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      email:this.userData.email
    }
    this.userService.changePassword(Data).subscribe((res: any) => {
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.ngxService.stop();
      this.dialogRef.close();
    }, (error: any) => {
      this.ngxService.stop();
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    });
  }
  validatePasswords(){
    if(this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword){
      return true
    }
    return false
  }
}
