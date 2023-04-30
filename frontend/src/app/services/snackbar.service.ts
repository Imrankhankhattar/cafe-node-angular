import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar:MatSnackBar) { }
  openSnackBar(message:string,action:string){
    if(action === 'error'){
      this.snackBar.open(message,action,{
        duration: 3000,
        horizontalPosition :'center',
        verticalPosition:'top',
        panelClass: ['black-snackbar']
      });
    }
    else{
      this.snackBar.open(message,action,{
        duration: 3000,
        horizontalPosition :'center',
        verticalPosition:'top',
        panelClass: ['green-snackbar']
      });
    }
  }
}
