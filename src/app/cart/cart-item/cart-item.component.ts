import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from 'src/app/models/app-state.models';
import CartItem from 'src/app/models/cart-item.model';
import Cart from 'src/app/models/cart-feature-state.model';
import * as CartActions from 'src/app/actions/cart.actions';

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

  ngOnInit() {
    this.cart$ = this.store.select((state) => state.cart);
  }


}
