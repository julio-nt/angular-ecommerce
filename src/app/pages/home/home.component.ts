import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { catchError } from 'rxjs';
import { ProductApiModel } from '../../models/product.type';
import { ProductItemComponent } from '../../components/product-item/product-item.component';

@Component({
  selector: 'app-home',
  imports: [ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loading = signal(true);
  productsService = inject(ProductsService);
  productsList = signal<ProductApiModel | undefined>(undefined);

  ngOnInit(): void {
    this.productsService
      .getProductsList()
      .pipe(
        catchError((err) => {
          console.error(err);
          this.loading.set(false);
          throw err;
        })
      )
      .subscribe((data) => {
        this.productsList.set(data);
        this.loading.set(false);
      });
  }
}
