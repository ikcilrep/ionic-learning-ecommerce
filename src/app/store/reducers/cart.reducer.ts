import { createReducer, on } from '@ngrx/store';
import { incrementProductAmount, subtractProductAmount } from '../actions/cart.action';
import CartFeatureState from '../models/cart-feature-state.model';

const initialState: CartFeatureState = { items: [] };

export const cartReducer = createReducer(initialState,
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
    }));
