import { createFeatureSelector, createSelector } from '@ngrx/store';
import CartFeatureState from '../models/cart-feature-state.model';
import CartItem from '../models/cart-item.model';

export const selectCartState = createFeatureSelector<CartFeatureState>('cart');

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
