import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.models';
import Cart from '../store/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart$: Observable<Cart>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.cart$ = this.store.select((state) => state.cart);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
