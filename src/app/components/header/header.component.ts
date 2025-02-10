import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm = signal('');
  productsService = inject(ProductsService);

  searchProducts() {
    this.productsService.searchProduct(this.searchTerm());
  }

  homeClicked() {
    this.productsService.getProductsList();
    this.searchTerm.set('');
  }
}
