import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/db';

export const incrementProductAmount = createAction('[Cart] Increment Product Amount', props<Product>());
export const subtractProductAmount = createAction('[Cart] Subtract Product Amount',
    props<{ product: Product; amountToSubtract: number }>());
