import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  searchTerm = signal('');

  searchProducts() {
    this.productsService.searchProduct(this.searchTerm());
  }

  homeClicked() {
    this.productsService.getProductsList();
    this.searchTerm.set('');
  }
}
