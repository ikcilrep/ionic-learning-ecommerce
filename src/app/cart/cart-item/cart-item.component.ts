import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from 'src/app/models/app-state.models';
import CartItem from 'src/app/models/cart-item.model';
import * as CartActions from 'src/app/actions/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item!: CartItem;

  constructor(private store: Store<AppState>) { }

  get displayablePrice(): string {
    return (this.item.product.price * this.item.amount).toFixed(2) + 'zł';
  }

  incrementProductAmount(): void {
    this.store.dispatch(CartActions.incrementProductAmount(this.item.product));
    this.store.dispatch(CartActions.saveCart());
  }

  subtractProductAmount(amountToSubtract: number): void {
    this.store.dispatch(CartActions.subtractProductAmount({
      product: this.item.product,
      amountToSubtract
    }));
    this.store.dispatch(CartActions.saveCart());
  }
}
