import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart = new Cart();
  tva =environment.tva/100;
  cart$=new Subject<Cart>();

  constructor() { }
  emitCart(){
    this.cart$.next(this.cart);
  }
  addToCart(product:Product){
    const item=this.cart.items.find(item=>item.product._id===product._id);
    if(item){
      item.quantity++;
    }
    else{
      const item=new Item();
      item.product=product;
      item.quantity=1;
      this.cart.items.push(item);
    }
    this.updateCart();
  }
  updateCart(){
    this.cart.items.forEach(item=>{
      this.cart.resume.quantity+=item.quantity;
      this.cart.resume.costHT+=item.quantity*item.product.price;
      this.cart.resume.costTax+=this.cart.resume.costHT*this.tva;
      this.cart.resume.costTTC+=this.cart.resume.costHT*(1+this.tva);
    });
    this.emitCart();
  }
  removeOne(product:Product){
    const item=this.cart.items.find(item=>item.product._id==product._id);
    if(item){
      if(item.quantity>1){
        item.quantity--;
      }
      else{
        const index=this.cart.items.indexOf(item);
        this.cart.items.splice(index,1);
      }
      this.updateCart();
    }
  }
  removeMany(product:Product){
    const item=this.cart.items.find(item=>item.product._id===product._id);
    if(item){
      const index=this.cart.items.indexOf(item);
      this.cart.items.splice(index,1);
    }
    this.updateCart();
  }
}
