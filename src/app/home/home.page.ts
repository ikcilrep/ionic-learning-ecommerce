import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../models/app-state.models';
import CartFeatureState from '../models/cart-feature-state.model';
import * as fromCart from '../selectors/cart.selectors';
import * as LoginActions from '../actions/login.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  numberOfItems$: Observable<number>;
  cart$: Observable<CartFeatureState>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.numberOfItems$ = this.store.select(fromCart.selectNumberOfItems);
    this.cart$ = this.store.select(fromCart.selectCartState);
    this.store.dispatch({ type: '[Cart] Load Cart' });
    this.store.dispatch(LoginActions.logInIfRemembered());
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
