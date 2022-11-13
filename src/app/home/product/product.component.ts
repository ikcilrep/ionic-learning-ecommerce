import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { incrementProductAmount } from 'src/app/store/actions/cart.action';
import AppState from 'src/app/store/models/app-state.models';
import { Product } from 'src/app/db';
import StorageService from 'src/app/providers/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  constructor(private store: Store<AppState>, private storageService: StorageService) { }

  ngOnInit() { }

  addToCart(): void {
    this.store.dispatch(incrementProductAmount(this.product));
    this.store.dispatch({ type: '[Cart] Save Cart' });
  }
}
