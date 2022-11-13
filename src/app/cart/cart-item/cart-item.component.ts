import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { incrementProductAmount, subtractProductAmount } from 'src/app/store/actions/cart.action';
import AppState from 'src/app/store/models/app-state.models';
import CartItem from 'src/app/store/models/cart-item.model';
import Cart from 'src/app/store/models/cart-feature-state.model';
import Product from 'src/app/store/models/product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItem;

  cart$: Observable<Cart>;

  constructor(private store: Store<AppState>) { }

  get displayablePrice(): string {
    return (this.item.product.price * this.item.amount).toFixed(2) + 'zł';
  }

  incrementProductAmount(): void {
    this.store.dispatch(incrementProductAmount(this.item.product));
    this.store.dispatch({ type: '[Cart] Save Cart' });
  }

  subtractProductAmount(amountToSubtract: number): void {
    this.store.dispatch(subtractProductAmount({
      product: this.item.product,
      amountToSubtract
    }));
    this.store.dispatch({ type: '[Cart] Save Cart' });
  }

  ngOnInit() {
    this.cart$ = this.store.select((state) => state.cart);
  }


}
