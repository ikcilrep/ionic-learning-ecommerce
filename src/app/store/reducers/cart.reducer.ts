import { createReducer, on } from '@ngrx/store';
import { addItem } from '../actions/cart-item.action';
import Cart from '../models/cart.model';

const initialState: Cart = new Cart();

export const cartReducer = createReducer(initialState, on(addItem, (state, product) => state.addItem(product)));
