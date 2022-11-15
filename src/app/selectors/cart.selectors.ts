import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';
import CartItem from '../models/cart-item.model';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectCartItems = createSelector(selectCartState,
  (state) => {
    const cartItems = [...state.items];
    cartItems.sort((a, b) => a.product.name.localeCompare(b.product.name));
    return cartItems;
  });

export const selectCartTotalPrice = createSelector(selectCartState, (state) => state.items.reduce(
  (accumulator: number, cartItem: CartItem) => accumulator + (cartItem.amount * cartItem.product.price), 0));

export const selectNumberOfItems = createSelector(selectCartState, (state) =>
  state.items.reduce((accumulator: number, cartItem: CartItem) => accumulator + cartItem.amount, 0));
