import { inject, Injectable, signal } from '@angular/core';
import { ProductApiModel } from '../models/product.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  getProductsList() {
    const url = 'https://dummyjson.com/products';
    return this.http.get<ProductApiModel>(url);
  }
}
