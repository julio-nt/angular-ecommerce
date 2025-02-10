import {
  Component,
  effect,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { catchError } from 'rxjs';
import { ProductApiModel } from '../../models/product.type';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    effect(() => {
      this.loading.set(true);
      this.productsList.set(this.productsService.searchResults());
      this.loading.set(false);
    });
  }

  ngOnInit(): void {
    this.productsService.getProductsList();
  }
}
