import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Shared/services/Products/products.service';
import { CartService } from '../../Shared/services/cart/cart.service';
import { WishlistService } from '../../Shared/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../Shared/components/ui/product-item/product-item.component';
import { Product } from '../../products';
import { ToastService } from '../../Shared/services/toast/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  products: Product[] = [];
  isLoading = true;
  callingApi = false;
  calledId = '';
  wishlistIds: string[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.products = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });

    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((product: any) => product.id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isInWishlist(id: string): boolean {
    return this.wishlistIds.includes(id);
  }

  toggleWishlist(id: string): void {
    if (this.isInWishlist(id)) {
      this.wishlistService.removeFromWishlist(id).subscribe({
        next: () => {
          this.wishlistIds = this.wishlistIds.filter(x => x !== id);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.wishlistService.addToWishlist(id).subscribe({
        next: () => {
          this.wishlistIds.push(id);
          this.toastService.show('It has been successfully added to your wishlist.', '❤️');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onSearch(term: string): void {
    term = term.trim().toLowerCase();
    this.products = this.allProducts.filter(p => p.title.toLowerCase().includes(term));
  }

  addToCart(id: string): void {
    this.callingApi = true;
    this.calledId = id;
    this.cartService.addProductToCart(id).subscribe({
      next: () => {
        this.callingApi = false;
        this.toastService.show('It has been successfully added.', '🚚');
      },
      error: (err: unknown) => {
        this.callingApi = false;
        console.error(err);
      }
    });
  }
}
