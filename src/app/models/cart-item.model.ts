import Product from './product.model';

export default interface CartItem {
    readonly product: Product;
    readonly amount: number;
}
