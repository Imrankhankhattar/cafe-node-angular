import { Component, OnInit, Inject,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {
  displayedColumn: string[] = [
    'name', 'category', 'price', 'quantity', 'total'
  ]
  dataSource: any;
  data: any;
  onDeleteProduct = new EventEmitter()
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private dialogRef: MatDialogRef<ViewBillProductsComponent>,) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.productDetails);
  }
}
