import { Product } from 'src/app/db';

export default interface CartItem {
    product: Product;
    amount: number;
}
