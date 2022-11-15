import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from 'src/app/models/app-state.models';
import { Product } from 'src/app/db';
import { incrementProductAmount } from 'src/app/actions/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

  addToCart(): void {
    this.store.dispatch(incrementProductAmount(this.product));
    this.store.dispatch({ type: '[Cart] Save Cart' });
  }
}
