import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter()
  onDeleteProduct = new EventEmitter()
  onEditProduct = new EventEmitter()
  productForm:any = FormGroup;
  action:any = 'Add'
  dialogAction:any = 'Add'
  responseMessage:any
  categories:any = []
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private snackbarService: SnackbarService,
  private formBuilder:FormBuilder,
  private productService:ProductService,
  private categoryService:CategoryService,
  private dialogRef: MatDialogRef<ProductComponent>,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null,Validators.required],
      categoryId:[null,Validators.required],
      description: [null,Validators.required],
      price:[null,Validators.required],
    });
    if(this.dialogData.action === 'Edit'){
      this.productForm.patchValue(this.dialogData.data);
      this.action = 'Update'
      this.dialogAction = 'Edit';
    }
    this.getCategories();
  }
  getCategories(){
    this.categoryService.get().subscribe((res:any)=>{
      this.categories = res.data;
    }),
    (error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    }
  }
  handleSubmit(){
    if(this.dialogData.action === 'Edit'){
      this.update()
    }
    else{

      this.add();
    }
  }
  add(){
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      description:formData.description,
      price:formData.price,
      categoryId:formData.categoryId,
      status:true
    }
    
    this.productService.add(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.onAddProduct.emit();
      this.dialogRef.close();
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
  update(){
    let formData = this.productForm.value;
    let data = {
      name: formData.name,
      categoryId:formData.categoryId,
      description:formData.description,
      price:formData.price,
      status:formData.status,
      id:this.dialogData.data.id
    }
    this.productService.update(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.onEditProduct.emit();
      this.dialogRef.close();
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }

}

