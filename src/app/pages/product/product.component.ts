import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.type';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productsService = inject(ProductsService);
  cartService = inject(CartService);

  loading = signal(true);
  productId = signal<string | null>(null);
  currentProduct = signal<ProductModel | undefined>(undefined);
  displayImage = signal(
    'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
  );
  quantity = signal(1);

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.productsService.getProductsList();
    // const product = this.productsService.getProductById(
    //   Number(this.route.snapshot.paramMap.get('id'))
    // );

    const product = this.productsService
      .searchResults()
      ?.products.find(
        (product) =>
          product.id === Number(this.route.snapshot.paramMap.get('id'))
      );

    console.log(product);

    if (product) {
      this.currentProduct.set(product);
      this.displayImage.set(
        product.images[0] ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8-e9Jpr1AyNwkdf_iE_zQjknFwrn3kBbQQ&s'
      );
      this.cdr.detectChanges();
    }

    this.productId.set(this.route.snapshot.paramMap.get('id'));
    this.loading.set(false);
  }

  handleImageClick(image: string) {
    this.displayImage.set(image);
  }

  handleQuantityChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!/^[0-9]*$/.test(value)) {
      return;
    }
  }

  handleQuantity(type: 'add' | 'remove') {
    if (type === 'add') {
      this.quantity.update((val) => val + 1);
    } else if (type === 'remove') {
      if (this.quantity() <= 1) {
        this.quantity.set(1);
        return;
      }
      this.quantity.update((val) => val - 1);
    }
  }

  addCart() {
    console.log('Produto: ', this.currentProduct());
    const product = this.currentProduct();

    if (!product) {
      console.error(
        'Erro: Nenhum produto disponível para adicionar ao carrinho.'
      );
      return;
    }

    if (product) {
      this.cartService.addToCart(product, this.quantity());
    }
  }
}
