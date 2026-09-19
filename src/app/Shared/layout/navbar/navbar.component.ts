import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  showAuthLinks = false;
  cartCount$ = this.cartService.cartCount$;

  constructor(private router: Router, private cartService: CartService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAuthLinks = event.url === '/login' || event.url === '/register';
      }
    });
  }

  ngOnInit(): void {
    this.cartService.getCartInfo().subscribe();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
    this.showAuthLinks = true;
  }
}
