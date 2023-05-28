import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displayedColumn: string[] = [
    'name', 'email', 'contact', 'status'
  ]
  dataSource: any;
  responseMessage: any;
  constructor(private snackbarService: SnackbarService, private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getData();
  }
  getData() {
    let data = {
      role: 'user'
    }
    this.userService.getUsers(data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
    }, (error: any) => {
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
    this.ngxService.stop();
  }
  filter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleEdit(st: any, id: any) {
    this.ngxService.start();
    st = st ? 1 : 0;
    let data = {
      id: parseFloat(id),
      status: st
    }
    this.userService.update(data).subscribe((res: any) => {
      this.getData();
      this.ngxService.stop();
    })
  }
}
