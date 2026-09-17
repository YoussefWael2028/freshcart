import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Shared/services/cart/cart.service';
import { Cart } from '../../cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
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
        console.log(res);
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
        console.log(res);
        this.cartInfo = res;
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
  }
}
