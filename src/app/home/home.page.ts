import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.models';
import Cart from '../store/models/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cart$: Observable<Cart>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.cart$ = this.store.select((state) => state.cart);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
