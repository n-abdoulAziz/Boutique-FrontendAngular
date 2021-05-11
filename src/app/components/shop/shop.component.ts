import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products:Product[];
  productSub:Subscription;
  userId;
  loading:boolean;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.products$.subscribe(
      (products:Product[])=>{
        this.loading=true;
        this.products=products;
      },
      (err)=>{
        this.loading=false;
        console.log(err);
      }
      );
      this.productService.getProduct();
  }
  ngOnDestro(){

  }

}
