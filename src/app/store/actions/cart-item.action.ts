import { Action } from '@ngrx/store';
import { Product } from 'src/db';

export enum CartItemActionType {
    addItem = '[CART_ITEM] Add CartItem',
}

export class AddItemAction implements Action {
    readonly type: string = CartItemActionType.addItem;
    constructor(public payload: Product) { }
}

export type CartItemAction = AddItemAction;
