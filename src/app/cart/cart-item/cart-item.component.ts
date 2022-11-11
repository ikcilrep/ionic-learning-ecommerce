import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { incrementProductAmount, subtractProductAmount } from 'src/app/store/actions/cart-item.action';
import AppState from 'src/app/store/models/app-state.models';
import CartItem from 'src/app/store/models/cart-item.model';
import Cart from 'src/app/store/models/cart.model';
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

  incrementProductAmount(item: CartItem): void {
    this.store.dispatch(incrementProductAmount(item.product));
  }

  subtractProductAmount(product: Product, amountToSubtract: number): void {
    this.store.dispatch(subtractProductAmount({ product, amountToSubtract }));
  }

  ngOnInit() {
    this.cart$ = this.store.select((state) => state.cart);
  }


}
