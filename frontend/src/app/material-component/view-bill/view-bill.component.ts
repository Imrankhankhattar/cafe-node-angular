import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  displayedColumn: string[] = [
    'name', 'email', 'contact', 'paymentMethod', 'total', 'view'
  ]
  dataSource: any;
  responseMessage: any;
  constructor(private billService: BillService, private snackbarService: SnackbarService, private dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getData();
  }
  getData() {
    this.billService.getBills().subscribe((res: any) => {
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
  handleView(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    }
    dialogConfig.width = '700px'
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }
  handleDelete(element: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:`delete ${element.name} Bill ?`
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub  = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=>{
      this.ngxService.start();
      this.deleteBill(element.id);
      this.ngxService.stop();
    })
  }
  deleteBill(id:any){
    this.billService.deleteBill(id).subscribe((res:any)=>{
      this.getData();
      this.snackbarService.openSnackBar(res.message,'success');
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
    
  }
  
  handleReport(element:any){
    this.ngxService.start()
    let data = {
      uuid:element.uuid
    }
    this.billService.getPdf(data).subscribe((res:any)=>{
      saveAs(res, element.uuid + 'pdf')
      this.ngxService.stop();
    })
  }
}
