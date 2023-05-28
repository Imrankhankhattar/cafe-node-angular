import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-maange-order',
  templateUrl: './maange-order.component.html',
  styleUrls: ['./maange-order.component.scss']
})
export class MaangeOrderComponent implements OnInit {
  displayedColumn: string[] = [
    'name', 'category', 'price', 'quantity', 'total', 'edit'
  ]
  dataSource: any = [];
  responseMessage: any;
  orderForm: any = FormGroup;
  categories: any;
  products: any;
  price: any;
  total: any = 0;
  constructor(private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private billService: BillService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.orderForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contact: [null, [Validators.required, Validators.pattern(GlobalConstants.contactRegex)]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      total: [0, [Validators.required]]
    });
    this.getCategories();
    this.ngxService.stop();
  }
  getCategories() {
    this.categoryService.get().subscribe((res: any) => {
      this.categories = res.data;
    }, (error: any) => {
      this.responseMessage = error.error.message;
      // this.snackbarService.openSnackBar(this.responseMessage, 'error');
    });
  }
  getProducts(category: any) {
    let data = {
      categoryId: parseFloat(category.id)
    }
    this.productService.get(data).subscribe((res: any) => {
      this.products = res.data;
      this.orderForm.controls['price'].setValue('')
      this.orderForm.controls['quantity'].setValue('')
      this.orderForm.controls['total'].setValue(0)
    }, (error: any) => {
      this.responseMessage = error.error.message;
      // this.snackbarService.openSnackBar(this.responseMessage, 'error');
    });
  }
  getProduct(e: any, key = 'productId') {
    let data = {
      [key]: parseFloat(e.id)
    }

    this.productService.get(data).subscribe((res: any) => {
      this.price = res.data[0].price;
      this.orderForm.controls['price'].setValue(this.price);
      this.orderForm.controls['quantity'].setValue(1);
      this.orderForm.controls['total'].setValue(this.price * 1);
    })
  }
  setQuantity() {
    this.total = this.orderForm.value.price * this.orderForm.value.quantity;
    this.orderForm.controls['total'].setValue(this.total);
  }
  validateProductAddition() {
    if (this.orderForm.controls['total'] == 0 || this.orderForm.controls['total'] === null || this.orderForm.controls['quantity'].value <= 0) {
      // this.responseMessage = 'Please select product and quantity';
      // this.snackbarService.openSnackBar(this.responseMessage, 'error');
      return true;
    }
    return false;
  }
  validateSubmit() {
    const { name, email, contact, paymentMethod, product } = this.orderForm.controls;
    if (!name.value || !email.value || !contact.value || !paymentMethod.value || !product.value || this.total === 0) {
      return true;
    }
    
    return false;
  }
  
  add() {
    let formData = this.orderForm.value;
    let product = this.dataSource.find((e: { id: any; }) => e.id == formData.product.id)
    if (product) {
      this.responseMessage = 'Product already added';
      this.snackbarService.openSnackBar(this.responseMessage, 'error');
    }
    else {
      this.total += formData.total;
      let data = {
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        price: formData.price,
        quantity: formData.quantity,
        total: formData.total
      }
      this.dataSource.push(data);
      this.dataSource = [...this.dataSource]
      this.snackbarService.openSnackBar('Product added!', 'success');
    }
  }
  delete(element: any) {
    this.total -= element.total;
    this.dataSource = this.dataSource.filter((e: { id: any; }) => e.id != element.id);
    this.dataSource = [...this.dataSource]
    this.snackbarService.openSnackBar('Product removed!', 'success');
  }
  submit() {
    if (!this.validateSubmit()) {
      this.ngxService.start();
      
      let data = {
        name: this.orderForm.controls['name'].value,
        email: this.orderForm.controls['email'].value,
        contact: this.orderForm.controls['contact'].value,
        paymentMethod: this.orderForm.controls['paymentMethod'].value,
        totalAmount: this.total,
        items: this.dataSource
      }
      this.billService.generateReport(data).subscribe((res: any) => {
        this.responseMessage = res.message;
        this.download(res.uuid.split(".")[0]);
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
        this.orderForm.reset();
        this.dataSource = [];
        this.total = 0;
      }, (error: any) => {
        this.responseMessage = error.error.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'error');
      });
      this.ngxService.stop();
    }
  }
  download(id: any) {
    let data = {
      uuid: id
    }
    this.billService.getPdf(data).subscribe((res: any) => {
      saveAs(res, id + 'pdf')
    })
  }
}