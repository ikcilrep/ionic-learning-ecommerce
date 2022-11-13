import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/db';
import CartFeatureState from '../models/cart-feature-state.model';

export const incrementProductAmount = createAction('[CartFeatureState] Increment Product Amount', props<Product>());

export const subtractProductAmount = createAction('[CartFeatureState] Subtract Product Amount',
    props<{ product: Product; amountToSubtract: number }>());

export const loadSuccess = createAction('[Cart API] Cart Loaded Success', props<CartFeatureState>());

export const loadFailure = createAction('[Cart API] Cart Not Loaded Failure');
