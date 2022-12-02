import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from 'src/app/models/app-state.model';
import * as CartActions from 'src/app/actions/cart.actions';
import { Router } from '@angular/router';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() { }

  addToCart(): void {
    this.store.dispatch(CartActions.addProductToCart(this.product));
    this.store.dispatch(CartActions.saveCart());
  }

  goToProductPage(): void {
    this.router.navigate(['/home/product-page', this.product.id.toString()]);
  }
}
