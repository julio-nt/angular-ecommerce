import { Injectable, signal } from '@angular/core';
import { ProductModel } from '../models/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<{ product: ProductModel; quantity: number }[]>([]);
  quantityTotal = signal<number>(0);

  addToCart(item: ProductModel, quantity: number) {
    const productExists = this.cart().find(
      (cartItem) => cartItem.product.id === item.id
    );

    if (productExists) {
      const totalQuantity = quantity + productExists.quantity;
      const newArr: { product: ProductModel; quantity: number }[] =
        this.cart().map((cartItem) =>
          cartItem.product.id === item.id
            ? {
                product: cartItem.product,
                quantity: totalQuantity,
              }
            : cartItem
        );

      this.cart.set(newArr);
    }

    if (!productExists) {
      this.cart().push({ product: item, quantity });
    }

    this.quantityTotal.set(
      this.cart().reduce((acc, item) => acc + item.quantity, 0)
    );
    console.log('Carrinho atual: ', this.cart(), this.quantityTotal());
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((cartItem) => cartItem.product.id !== id));
  }
}
