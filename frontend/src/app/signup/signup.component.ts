import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFrom: any = FormGroup;
  responseMessage: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private snackbarService: SnackbarService, private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signUpFrom = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]],
      contact: [null, [Validators.required, Validators.pattern(GlobalConstants.contactRegex)]],
      role:['user',null]
    });
  }
  handleSubmit(){
    this.ngxService.start();
    this.userService.signup(this.signUpFrom.value).subscribe((res: any) => {
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
