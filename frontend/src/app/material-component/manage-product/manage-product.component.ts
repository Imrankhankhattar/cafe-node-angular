import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displayedColumn :string[]=[
    'name','description','categoryName','price','edit'
  ]
  dataSource :any;
  responseMessage:any;
  constructor(private snackbarService: SnackbarService, private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private productService:ProductService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getData();
  }

  getData(){
    this.productService.get().subscribe((res:any)=>{
      this.dataSource =new MatTableDataSource(res.data);
      this.ngxService.stop();
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
  filter(e:Event){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action : 'Add'
    }
    dialogConfig.width = '700px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddProduct.subscribe((res)=>{
      this.getData();
    })
  }
  handleEdit(elem:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action : 'Edit',
      data : elem
    }
    dialogConfig.width = '700px'
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditProduct.subscribe((res)=>{
      this.getData();
    })

  }
  handleDelete(element:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:`delete ${element.name} product ?`
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub  = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=>{
      this.ngxService.start();
      this.deleteProduct(element);
      this.ngxService.stop();
    })
  }
  deleteProduct(element:any){
    element.id = parseFloat(element.id)
    this.productService.delete(element).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.getData();
    })
  }
  onChange(status:any,id:any){
    this.ngxService.start();
    const data = {
      id : parseFloat(id),
      status : status.checked
    }
    this.productService.update(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar('Product status updated', 'success');
      this.getData();
    })
    this.ngxService.stop();
  }
}
