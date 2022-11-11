import { Product } from 'src/db';

export default interface CartItem {
    product: Product;
    amount: number;
}
