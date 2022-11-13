import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.models';
import CartFeatureState from '../store/models/cart-feature-state.model';
import { selectCartState, selectNumberOfItems } from '../store/reducers/cart.selector';

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
    this.numberOfItems$ = this.store.select(selectNumberOfItems);
    this.cart$ = this.store.select(selectCartState);
    this.store.dispatch({ type: '[Cart] Load Cart' });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
