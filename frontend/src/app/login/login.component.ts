import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }
  handleSubmit(){
    this.ngxService.start();
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      this.responseMessage = res.message;
      localStorage.setItem('token',res.token);
      this.router.navigate(['/cafe/dashboard'])
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.ngxService.stop();
      this.dialogRef.close();
    }, (error: any) => {
      this.ngxService.stop();
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    });
    
  }

}
