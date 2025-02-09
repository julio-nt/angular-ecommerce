import { Component, input } from '@angular/core';
import { ProductModel } from '../../models/product.type';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  product = input.required<ProductModel>();
}
