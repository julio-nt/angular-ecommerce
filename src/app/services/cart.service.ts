import { Injectable, signal } from '@angular/core';
import { ProductModel } from '../models/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<{ product: ProductModel; quantity: number }[]>([]);

  addToCart(item: ProductModel, quantity: number) {
    this.cart().push({ product: item, quantity });
    console.log('Carrinho atual: ', this.cart());
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((cartItem) => cartItem.product.id !== id));
  }
}
