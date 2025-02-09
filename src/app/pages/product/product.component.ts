import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductApiModel, ProductModel } from '../../models/product.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productId = signal<string | null>(null);
  productsService = inject(ProductsService);
  currentProduct = signal<ProductModel | undefined>(undefined);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productsService
      .getProductsList()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe((data) => {
        const product = data.products.find(
          (product) =>
            product.id === Number(this.route.snapshot.paramMap.get('id'))
        );
        this.currentProduct.set(product);
      });
    this.productId.set(this.route.snapshot.paramMap.get('id'));
  }
}
