import { createAction, props } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';
import Product from '../models/product.model';

export const incrementProductAmount = createAction('[CartFeatureState] Increment Product Amount', props<Product>());

export const subtractProductAmount = createAction('[CartFeatureState] Subtract Product Amount',
  props<{ product: Product; amountToSubtract: number }>());

export const loadSuccess = createAction('[Cart API] Cart Loaded Success', props<fromCart.State>());

export const loadFailure = createAction('[Cart API] Cart Not Loaded Failure');
