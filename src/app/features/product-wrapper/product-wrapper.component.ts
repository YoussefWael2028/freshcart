import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-wrapper',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './product-wrapper.component.html',
  styleUrl: './product-wrapper.component.css'
})
export class ProductWrapperComponent {

}
