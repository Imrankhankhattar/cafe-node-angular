import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CategoryComponent } from '../dialog/category/category.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumn: string[] = [
    'name', 'edit'
  ]
  dataSource: any;
  responseMessage: any;
  constructor(private snackbarService: SnackbarService, private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getData();
  }
  getData() {
    this.categoryService.get().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.ngxService.stop();
    }, (error: any) => {
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
  filter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  handleAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '500px'
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddCategory.subscribe((res) => {
      this.getData();
    })
  }
  handleEdit(elem: any) {

  }
  handleDelete(element: any) {
    element.id = parseFloat(element.id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `delete "${element.name}" category and its associated products?`
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(() => {
      this.ngxService.start();
      this.deleteCategory(element);
      this.ngxService.stop();
    })
  }
  deleteCategory(element: any) {
    this.categoryService.delete(element.id).subscribe((res: any) => {
      this.getData();
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
    }, (error: any) => {
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
}
