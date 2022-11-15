import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../models/app-state.models';
import CartItem from '../models/cart-item.model';
import * as fromCart from '../selectors/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(private store: Store<AppState>, private router: Router) { }

  trackByItem(_index: number, item: CartItem) {
    return item.product.id;
  }

  ngOnInit() {
    this.cartItems$ = this.store.select(fromCart.selectCartItems);
    this.totalPrice$ = this.store.select(fromCart.selectCartTotalPrice);
    this.store.dispatch({ type: '[Cart] Load Cart' });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
