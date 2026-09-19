import { Product } from './../../../../products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/Products/products.service';
import { ProductItemComponent } from '../../ui/product-item/product-item.component';
import { CartService } from '../../../services/cart/cart.service';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-recent-item',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './recent-item.component.html',
  styleUrl: './recent-item.component.css',
})
export class RecentProductsComponent implements OnInit {
  products: Product[] = [];
  callingApi: boolean = false;
  calledId: string = "";
  wishlistIds: string[] = [];

  constructor(
    private _productService: ProductsService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((product: any) => product.id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getProducts() {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  addToCart(id: string) {
    this.callingApi = true;
    this.calledId = id;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.callingApi = false;
        this._toastService.show('It has been successfully added.', '🚚');
      },
      error: (err) => {
        this.callingApi = false;
        console.error(err);
      }
    });
  }

  isInWishlist(id: string): boolean {
    return this.wishlistIds.includes(id);
  }

  toggleWishlist(id: string): void {
    if (this.isInWishlist(id)) {
      this._wishlistService.removeFromWishlist(id).subscribe({
        next: () => {
          this.wishlistIds = this.wishlistIds.filter(x => x !== id);
        },
        error: (err) => console.error(err)
      });
    } else {
      this._wishlistService.addToWishlist(id).subscribe({
        next: () => {
          this.wishlistIds.push(id);
          this._toastService.show('It has been successfully added to your wishlist.', '❤️');
        },
        error: (err) => console.error(err)
      });
    }
  }
}
