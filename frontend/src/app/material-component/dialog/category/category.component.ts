import { Component, OnInit ,EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter()
  onDeleteCategory = new EventEmitter()
  onEditCategory = new EventEmitter()
  categoryForm:any = FormGroup;
  action:any = 'Add'
  dialogAction:any = 'Add'
  responseMessage:any
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,private snackbarService: SnackbarService,private formBuilder:FormBuilder,private categoryService:CategoryService,private dialogRef: MatDialogRef<CategoryComponent>,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null,Validators.required],
      description: [null,Validators.required]
    });
    if(this.dialogData.action === 'Edit'){
      this.categoryForm.patchValue(this.dialogData.data);
      this.action = 'Update'
      this.dialogAction = 'Edit';
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
    let formData = this.categoryForm.value;
    let data = {
      name: formData.name,
      description:formData.description
    }
    this.categoryService.add(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.onAddCategory.emit();
      this.dialogRef.close();
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
  update(){
    let formData = this.categoryForm.value;
    let data = {
      name: formData.name,
      description:formData.description,
      id:this.dialogData.data.id
    }
    this.categoryService.update(data).subscribe((res:any)=>{
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'success');
      this.onEditCategory.emit();
      this.dialogRef.close();
    },(error:any)=>{
      this.responseMessage = error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    })
  }
}
