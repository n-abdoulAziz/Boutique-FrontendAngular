import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api=environment.api
  products:Product[];
  products$=new Subject<Product[]>();
  constructor(private http:HttpClient) {
   }
   emitProduct(){
     this.products$.next(this.products);
   }
   getProduct(){
     this.http.get(this.api+'/product').subscribe(
       (data:Data)=>{
         if(data.status==200){
           this.products=data.result;
           this.emitProduct();
         }
         else
          console.log(data);

     }),
     (err)=>{
      console.log(err);
     }
   }
   getProductById(id:string){
     return new Promise((resolve,reject)=>{
       this.http.get(this.api+'/products/'+id).subscribe(
         (data:Data)=>{
           if(data.status==200){
             resolve(data.result);
           }
           else
           console.log(data.message)
         }),
         (err)=>{
           reject(err);
         }

     })

   }
   createProduct(product:Product,image:File){
     return new Promise((resolve,reject)=>{
       let productData:FormData=new FormData();
       productData.append('product',JSON.stringify(product))
       productData.append('image',image);

       this.http.post(this.api+'/products',productData).subscribe(
         (data:Data)=>{
           if(data.status==201){
             this.getProduct();
             resolve(data);
           }
           else{
             reject(data.message)
           }
         }),
         (err)=>{
           reject(err);
         }

      })

  }
  updateProduct(id:number,product:Product,image:File | string){
    return new Promise((resolve,reject)=>{
      let productData:FormData=new FormData();
      if(typeof image=='string'){
        product.image=image;
      }
      else{
        productData.append('image',image);
      }
      productData.append('product',JSON.stringify(product));
      this.http.put(this.api+'/products/'+id,productData).subscribe(
        (data:Data)=>{
          if(data.satus==200){
            resolve(data);
          }else{
            reject(data.message)
          }


        },
        (err)=>{
          reject(err);
        })
    })

  }
  deleteProduct(id:number){
    return new Promise((resolve,reject)=>{
      this.http.delete(this.api+'/products/'+id).subscribe(
        ()=>{
          this.getProduct();
          resolve(true);
        },
        (err)=>{
          console.log(err);
        })
    })
  }
}

