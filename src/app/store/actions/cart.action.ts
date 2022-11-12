import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/db';

export const incrementProductAmount = createAction('[CartFeatureState] Increment Product Amount', props<Product>());
export const subtractProductAmount = createAction('[CartFeatuerState] Subtract Product Amount',
    props<{ product: Product; amountToSubtract: number }>());
