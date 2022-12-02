import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/cart.actions';
import CartItem from '../models/cart-item.model';
import Product from '../models/product.model';

export const cartFeatureKey = 'cart';

export interface State {
  readonly items: CartItem[];
}

export const initialState: State = {
  items: []
};

const incrementProductAmount = (state: State, product: Product) => {
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
};

export const reducer = createReducer(initialState,
  on(LoginActions.incrementProductAmount, incrementProductAmount),
  on(LoginActions.addProductToCart, incrementProductAmount),
  on(LoginActions.subtractProductAmount, (state, { product, amountToSubtract }) => {
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
  on(LoginActions.loadSuccess, (_state, cart) => cart),
  on(LoginActions.loadFailure, (state) => state)
);
