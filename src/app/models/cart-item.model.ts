import { Product } from 'src/app/db';

export default interface CartItem {
    readonly product: Product;
    readonly amount: number;
}
