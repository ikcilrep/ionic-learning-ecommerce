import { incrementProductAmount } from '../actions/cart.actions';
import { reducer, initialState } from './cart.reducer';
import { products } from '../db';

describe('Cart Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('increment product amount', () => {
    it('should return a new cart instance', () => {
      const product = products[0];
      const result = reducer(initialState, incrementProductAmount(product));

      expect(result).not.toBe(initialState);
    });

    it('should create a new item, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, incrementProductAmount(product));

      expect(result.items.length).toBeGreaterThan(0);
    });

    it('should create a new item with amount 1, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, incrementProductAmount(product));

      expect(result.items[0].amount).toBe(1);
    });

    it('should increase a product\'s amount by 1, if present in the cart', () => {
      const product = products[0];
      const item = { product, amount: 1 };
      const cartWithProduct = { items: [item] };
      const result = reducer(cartWithProduct, incrementProductAmount(product));

      expect(result.items[0].amount).toBe(item.amount + 1);
    });
  });
});
