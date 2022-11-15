import CartItem from './cart-item.model';

export default interface CartFeatureState {
    readonly items: CartItem[];
}
