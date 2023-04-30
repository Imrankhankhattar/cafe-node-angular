import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotPasswordForm:any = FormGroup;
responseMessage:any;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService
    ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]

    })
  }
  handleSubmit(){
    this.ngxService.start();
    this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
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

}
