import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProductDetailsComponent } from './Core/Pages/product-details/product-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';

import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderComponent } from './features/order/order.component';
import { RegisterComponent } from './Core/Pages/register/register/register.component';
import { LoginComponent } from './Core/Pages/login/login/login.component';
import { ForgotPasswordComponent } from './Core/Pages/forgot-password/forgot-password.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'brands', component: BrandsComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'order', component: OrderComponent},
  { path: 'productDetails/:id', component: ProductDetailsComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"**",component:NotFoundComponent},
];
