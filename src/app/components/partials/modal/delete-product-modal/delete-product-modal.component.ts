import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {
 @Input() product:Product;
 userId:string;


  constructor(private auth:AuthService,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.userId=this.auth.userId;
  }
  deleteProduct(product:Product){
    console.log('product deleted !');
  }

}
