import CartFeatureState from './cart-feature-state.model';

export default interface AppState {
    readonly cart: CartFeatureState;
}
