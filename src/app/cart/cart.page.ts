import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.models';
import CartItem from '../store/models/cart-item.model';
import { selectCartItems, selectCartTotalPrice } from '../store/reducers/cart.selector';

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
    this.cartItems$ = this.store.select(selectCartItems);
    this.totalPrice$ = this.store.select(selectCartTotalPrice);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
