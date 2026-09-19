import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Shared/services/wishlist/wishlist.service';
import { CartService } from '../../Shared/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../products';
import { ToastService } from '../../Shared/services/toast/toast.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];
  isLoading = true;
  callingApi = false;
  calledId = '';

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addToCart(id: string): void {
    this.callingApi = true;
    this.calledId = id;
    this.cartService.addProductToCart(id).subscribe({
      next: () => {
        this.callingApi = false;
        this.toastService.show('It has been successfully added.', '🚚');
      },
      error: (err) => {
        this.callingApi = false;
        console.error(err);
      }
    });
  }
}
