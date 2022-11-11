import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddItemAction } from 'src/app/store/actions/cart-item.action';
import { AppState } from 'src/app/store/models/app-state.models';
import { Product } from 'src/db';

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
    this.store.dispatch(new AddItemAction(this.product));
  }
}
