import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'produto/:id',
    loadComponent: () =>
      import('./pages/product/product.component').then(
        (m) => m.ProductComponent
      ),
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
  },
];
