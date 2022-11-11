import { CartItemAction, CartItemActionType } from '../actions/cart-item.action';
import Cart from '../models/cart.model';

const initialState: Cart = new Cart();

export const cartReducer = (state: Cart = initialState, action: CartItemAction) => {
    switch (action.type) {
        case CartItemActionType.addItem:
            return state.addProduct(action.payload);
        default:
            return state;
    }
};
