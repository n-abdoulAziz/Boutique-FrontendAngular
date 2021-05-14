import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup;
  errorMessage:string;
  imagePreview:string;
  loading:boolean;
  userId;
  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      name:[null,Validators.required],
      descrption:[null,Validators.required],
      stock:[2,Validators.required],
      price:[0,Validators.required],
      image:[null,Validators.required]
    });
    this.userId=this.auth.userId
  }
  onSubmit(){
    this.loading=true;
    const product=new Product();

    product.name=this.productForm.get('name').value;
    product.description=this.productForm.get('description').value;
    product.price=this.productForm.get('price').value*100;
    product.stock=this.productForm.get('stock').value;
    product.image='';
    product.userId=this.userId;

  //save product
  this.productService.createProduct(product,this.productForm.get('image').value)
    .then(
      ()=>{
        this.productForm.reset();
        this.loading=false;
        this.router.navigate(['/shop']);

    })
    .catch((err)=>{
      this.loading=false;
      this.errorMessage=err.message;
    });


  }
  onImagePick(event:Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.productForm.get('image').patchValue(file);
    this.productForm.get('image').updateValueAndValidity();

    const reader=new FileReader();
    reader.onload=()=>{
      if(this.productForm.get('image').valid){
        this.imagePreview=reader.result as string;
      }
      else{
        this.imagePreview=null;
      }
    }
    reader.readAsDataURL(file);
  }

}
