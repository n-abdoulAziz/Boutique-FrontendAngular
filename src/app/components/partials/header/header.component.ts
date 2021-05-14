import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth;
  cart:Cart;
  resume;
  constructor(private auth:AuthService,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.emitCart();
    this.cartService.cart$.subscribe(
      (cart:Cart)=>{
        this.resume=cart.resume;
      },
      (err)=>{
        console.log(err);
      }
      )
    this.auth.isAuth$.subscribe((bool:boolean)=>{
      this.isAuth=bool;
    })
  }
  logout(){
    this.auth.logout();
  }

}
