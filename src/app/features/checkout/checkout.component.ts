import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../Shared/services/toast/toast.service';
import { OrderService } from '../../Shared/services/order/order.service';
import { CartService } from '../../Shared/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartId = '';
  checkoutForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      details: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.cartService.getCartInfo().subscribe({
      next: (res) => {
        this.cartId = res.cartId;
      },
      error: (err) => {
        console.error('Error fetching cart info:', err);
      }
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.orderService.placeCashOrder(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.cartService.cartCount$.next(0);
        this.toastService.show('Order placed successfully!', '📦');
        this.router.navigate(['/order']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error placing order:', err);
      }
    });
  }
}
