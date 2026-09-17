import { Product } from './../../../../products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/Products/products.service';
import { ProductItemComponent } from '../../ui/product-item/product-item.component';
import { CartService } from '../../../services/cart/cart.service';



@Component({
  selector: 'app-recent-item',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './recent-item.component.html',
  styleUrl: './recent-item.component.css',
  
})

export class RecentProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private _productService:ProductsService,private _cartService:CartService ) {}
  callingApi:boolean=false;
  calledId:string="";
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products=res.data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }
  addToCart(id: string) {
    this.callingApi=true;
    this.calledId=id;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.callingApi=false
      }
    });
  }
  












}