import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Shared/services/cart/cart.service';
import { Cart, cartProducts } from '../../cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartInfo: Cart = {} as Cart;

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this.getCartInfo();
  }

  getCartInfo() {
    this._cartService.getCartInfo().subscribe({
      next: (res) => {
        this.cartInfo = res;
      },
      error: (err) => {
        console.error('Error fetching cart info:', err);
      }
    });
  }

  removeItem(id: string) {
    this._cartService.DeleteProduct(id).subscribe({
      next: (res) => {
        this.cartInfo = res;
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
  }

  increaseCount(item: cartProducts) {
    this._cartService.updateProductCount(item.product.id, item.count + 1).subscribe({
      next: (res) => {
        this.cartInfo = res;
      },
      error: (err) => {
        console.error('Error increasing product count:', err);
      }
    });
  }

  decreaseCount(item: cartProducts) {
    if (item.count === 1) {
      this.removeItem(item.product.id);
      return;
    }
    this._cartService.updateProductCount(item.product.id, item.count - 1).subscribe({
      next: (res) => {
        this.cartInfo = res;
      },
      error: (err) => {
        console.error('Error decreasing product count:', err);
      }
    });
  }
}
