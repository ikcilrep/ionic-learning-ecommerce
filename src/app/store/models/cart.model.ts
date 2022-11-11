import { provideCloudflareLoader } from '@angular/common';
import { Product } from 'src/app/db';
import CartItem from './cart-item.model';

export default class Cart {
    constructor(readonly items: Array<CartItem> = []) { }

    public get numberOfItems() {
        return this.items.reduce((count, item) => count + item.amount, 0);
    }

    public get price(): number {
        return this.items.reduce((price, item) => price + item.price, 0);
    }

    public get displayablePrice(): string {
        return this.price.toFixed(2) + 'zł';
    }

    public incrementProductAmount(product: Product): Cart {
        const productIndex = this.items.findIndex((item) => item.product.id === product.id);
        if (productIndex !== -1) {
            return new Cart(this.copyItemsWithIncrementedProductAmount(productIndex));
        }

        return new Cart([...this.items, new CartItem(product, 1)]);
    }

    public subtractProductAmount(product: Product, amountToSubtract: number): Cart {
        const productIndex = this.items.findIndex((item) => item.product.id === product.id);
        if (productIndex === -1) {
            throw new Error('Provided product is not in the cart.');
        }

        return new Cart(this.copyItemsWithSubtractedProductAmount(productIndex, amountToSubtract));
    }

    private copyItemsWithSubtractedProductAmount(productIndex: number, amountToSubtract: number) {
        const newItems = [...this.items];
        const foundItem = newItems[productIndex];
        if (foundItem.amount - amountToSubtract <= 0) {
            newItems.splice(productIndex, 1);
        } else {
            newItems[productIndex] = new CartItem(foundItem.product, foundItem.amount - amountToSubtract);
        }
        return newItems;
    }

    private copyItemsWithIncrementedProductAmount(productIndex: number): Array<CartItem> {
        const newItems = [...this.items];
        const item = newItems[productIndex];
        newItems[productIndex] = new CartItem(item.product, item.amount + 1);
        return newItems;
    }
}
