import { inject, Injectable, signal } from '@angular/core';
import { ProductApiModel, ProductModel } from '../models/product.type';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  products = signal<ProductApiModel | undefined>(undefined);
  searchResults = signal<ProductApiModel | undefined>(undefined);

  getProductsList() {
    const url = 'https://dummyjson.com/products';
    return this.http
      .get<ProductApiModel>(url)
      .pipe(
        catchError((err) => {
          console.error('Erro ao carregar lista de produtos: ', err);
          throw err;
        })
      )
      .subscribe((data) => {
        this.searchResults.set(data);
        this.products.set(data);
        return data;
      });
  }

  getProductById(id: number) {
    const url = 'https://dummyjson.com/products/' + id;
    return this.http.get<ProductModel>(url).subscribe((data) => data);
  }

  searchProduct(text: string) {
    console.log('searching for products2 ' + text);
    const url = 'https://dummyjson.com/products/search?q=' + text;
    return this.http.get<ProductApiModel>(url).subscribe((data) => {
      this.searchResults.set(data);
      return data;
    });
  }
}
