import * as CartActions from '../actions/cart.actions';
import { reducer, initialState, State } from './cart.reducer';
import { Product, products } from '../db';
import { waitForAsync } from '@angular/core/testing';
import CartItem from '../models/cart-item.model';

describe('Cart Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('incrementProductAmount', () => {
    it('should return a new cart instance', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.incrementProductAmount(product));

      expect(result).not.toBe(initialState);
    });

    it('should create a new item, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.incrementProductAmount(product));

      expect(result.items.length).toBeGreaterThan(0);
    });

    it('should create a new item with amount 1, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.incrementProductAmount(product));

      expect(result.items[0].amount).toBe(1);
    });

    it('should increase a product\'s amount by 1, if present in the cart', () => {
      const product = products[0];
      const item = { product, amount: 1 };
      const cartWithProduct = { items: [item] };
      const result = reducer(cartWithProduct, CartActions.incrementProductAmount(product));

      expect(result.items[0].amount).toBe(item.amount + 1);
    });
  });

  describe('addProductToCart', () => {
    it('should return a new cart instance', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.addProductToCart(product));

      expect(result).not.toBe(initialState);
    });

    it('should create a new item, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.addProductToCart(product));

      expect(result.items.length).toBeGreaterThan(0);
    });

    it('should create a new item with amount 1, if product not present in the cart', () => {
      const product = products[0];
      const result = reducer(initialState, CartActions.addProductToCart(product));

      expect(result.items[0].amount).toBe(1);
    });

    it('should increase a product\'s amount by 1, if present in the cart', () => {
      const product = products[0];
      const item = { product, amount: 1 };
      const cartWithProduct = { items: [item] };
      const result = reducer(cartWithProduct, CartActions.addProductToCart(product));

      expect(result.items[0].amount).toBe(item.amount + 1);
    });
  });

  describe('subtractProductAmount', () => {
    let product: Product;
    let item: CartItem;
    let cartWithProduct: State;
    beforeEach(waitForAsync(() => {
      product = products[0];
      item = { product, amount: 2 };
      cartWithProduct = { items: [item] };
    }));

    it('should return a new cart instance', () => {
      const result = reducer(cartWithProduct, CartActions.subtractProductAmount({ product, amountToSubtract: 0 }));

      expect(result).not.toBe(cartWithProduct);
    });

    it('should remove the item, if more of a product has been subtracted than current', () => {
      const result = reducer(cartWithProduct, CartActions.subtractProductAmount({ product, amountToSubtract: 3 }));

      expect(result.items.length).toBe(0);
    });

    it('should remove the item, if the amount of a product subtracted is the same as current', () => {
      const result = reducer(cartWithProduct, CartActions.subtractProductAmount({ product, amountToSubtract: 2 }));

      expect(result.items.length).toBe(0);
    });

    it('should subtract the amountToSubtract from the current amount, if the current amount is greater than the amountToSubtract', () => {
      const result = reducer(cartWithProduct, CartActions.subtractProductAmount({ product, amountToSubtract: 1 }));

      expect(result.items[0].amount).toBe(1);
    });
  });
});
