import { products } from '../db';
import * as fromCart from '../reducers/cart.reducer';
import { selectCartItems, selectCartState, selectCartTotalPrice, selectNumberOfItems } from './cart.selectors';

describe('Cart Selectors', () => {
  const items = [{ product: products[0], amount: 1 }, { product: products[1], amount: 1 }];
  describe('selectCartState', () => {
    it('should select the feature state', () => {
      const result = selectCartState({
        [fromCart.cartFeatureKey]: fromCart.initialState
      });

      expect(result).toEqual(fromCart.initialState);
    });
  });

  describe('selectCartItems', () => {
    it('should select the cart items', () => {
      const result = selectCartItems.projector({ items });

      expect(result).toEqual(jasmine.arrayWithExactContents(items));
    });

    it('should return items sorted ascendingly alphabetically by product names', () => {
      const result = selectCartItems.projector({ items });

      expect(result).toEqual([items[1], items[0]]);
    });
  });

  describe('selectCartTotalPrice', () => {
    it('should select the sum of item prices', () => {
      const result = selectCartTotalPrice.projector({ items });

      const expectedPrice = items[0].product.price + items[1].product.price;

      expect(result).toBe(expectedPrice);
    });
  });

  describe('selectNumberOfItems', () => {
    it('should select the number of items', () => {
      const result = selectNumberOfItems.projector({ items });
      expect(result).toBe(2);
    });
  });
});
