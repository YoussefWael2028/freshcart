import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Product } from '../../../../products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
 
@Input() product !:Product;
@Input()callingApi !:boolean;
@Input()calledId !:string;


@Output() productIdEmitter: EventEmitter<string> = new EventEmitter();

addToCart(id: string) {
  this.productIdEmitter.emit(id);
}

}
