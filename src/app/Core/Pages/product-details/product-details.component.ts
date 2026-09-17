import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Shared/services/Products/products.service';
import { Product } from '../../../products';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../Shared/services/cart/cart.service';
import { log } from 'console';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  ProductDetails!:Product
  productId!:string
  callingAPI: boolean = false;
  constructor(private _activatedRoute: ActivatedRoute, private _productsService:ProductsService,private readonly _cartservice:CartService) {
    this._activatedRoute.params.subscribe({ 
      next: (res: any) => {
        this.productId = res.id;
      }
    });
  }

  ngOnInit() {
    this.getProductDetails();
  }
  
  getProductDetails() {
    this._productsService.getProduct(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.ProductDetails=res.data
      }
    });
  }
  addToCart(id: string) {
    if(this.callingAPI)return;
    this.callingAPI=true
    this._cartservice.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
        this.callingAPI=false;
      },
    });
  }
  
}
