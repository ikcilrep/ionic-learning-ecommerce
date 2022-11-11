import { Product } from 'src/db';
import CartItem from './cart-item.model';

export default class Cart {
    constructor(readonly items: Array<CartItem> = []) { }

    public get numberOfItems() {
        return this.items.reduce((count, item) => count + item.amount, 0);
    }

    public addProduct(product: Product): Cart {
        const productIndex = this.items.findIndex((item) => item.product.id === product.id);
        if (productIndex !== -1) {
            return new Cart(this.copyItemsWithIncrementedProductAmount(productIndex));
        }

        return new Cart([...this.items, { product, amount: 1 }]);
    }

    private copyItemsWithIncrementedProductAmount(productIndex: number): Array<CartItem> {
        const newItems = [...this.items];
        const item = newItems[productIndex];
        newItems[productIndex] = { product: item.product, amount: item.amount + 1 };
        return newItems;
    }
}
