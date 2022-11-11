import { createReducer, on } from '@ngrx/store';
import { incrementProductAmount, subtractProductAmount } from '../actions/cart-item.action';
import Cart from '../models/cart.model';

const initialState: Cart = new Cart();

export const cartReducer = createReducer(initialState,
    on(incrementProductAmount, (state, product) => state.incrementProductAmount(product)),
    on(subtractProductAmount, (state, { product, amountToSubtract }) => state.subtractProductAmount(product, amountToSubtract)));
