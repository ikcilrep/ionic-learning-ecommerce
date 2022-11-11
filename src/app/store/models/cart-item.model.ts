import { Product } from 'src/app/db';

export default class CartItem {
    constructor(public product: Product, public amount: number) { }

    public get price(): number {
        return this.amount * this.product.price;
    }

    public get displayablePrice(): string {
        return this.price.toFixed(2) + 'zł';
    }
}
