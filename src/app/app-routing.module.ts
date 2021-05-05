import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HeaderPageComponent } from './components/partials/header-page/header-page.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { AddProductComponent } from './components/shop/add-product/add-product.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { EditProductComponent } from './components/shop/edit-product/edit-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleProductComponent } from './components/shop/single-product/single-product.component';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'footer',component:FooterComponent},
  {path:'header',component:HeaderComponent},
  {path:'header-page',component:HeaderPageComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'cart',component:CartComponent},
  {path:'edit-product/:id',component:EditProductComponent},
  {path:'single-product/:id',component:SingleProductComponent},
  {path:'shop',component:ShopComponent},
  {path:'',component:ShopComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
