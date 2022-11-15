import { createReducer, on } from '@ngrx/store';
import { incrementProductAmount, loadFailure, loadSuccess, subtractProductAmount } from '../actions/cart.actions';
import CartItem from '../models/cart-item.model';

export const cartFeatureKey = 'cart';

export interface State {
  readonly items: CartItem[];
}

export const initialState: State = {
  items: []
};

export const reducer = createReducer(initialState,
  on(incrementProductAmount, (state, product) => {
    const itemIndex = state.items.findIndex((item) => item.product.id === product.id);
    if (itemIndex !== -1) {
      return {
        items: [...state.items.filter((_, index) => index !== itemIndex),
        { product, amount: state.items[itemIndex].amount + 1 }]
      };
    }
    return {
      items: [...state.items, { product, amount: 1 }]
    };
  }),
  on(subtractProductAmount, (state, { product, amountToSubtract }) => {
    const itemIndex = state.items.findIndex((item) => item.product.id === product.id);
    if (itemIndex === -1) {
      throw new Error();
    }

    const productAmount = state.items[itemIndex].amount;
    const itemsWithoutProduct = state.items.filter((_, index) => index !== itemIndex);
    if (productAmount > amountToSubtract) {
      return {
        items: [...itemsWithoutProduct,
        { product, amount: productAmount - amountToSubtract }]
      };
    }

    return { items: itemsWithoutProduct };
  }),
  on(loadSuccess, (_state, cart) => cart),
  on(loadFailure, (state) => state)
);
