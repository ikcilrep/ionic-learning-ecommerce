import { createAction, props } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';
import Product from '../models/product.model';

export const addProductToCart = createAction('[Product Component] Add Product To Cart', props<Product>());

export const incrementProductAmount = createAction('[Cart Item Component] Increment Product Amount', props<Product>());

export const subtractProductAmount = createAction('[Cart Item Component] Subtract Product Amount',
  props<{ product: Product; amountToSubtract: number }>());

export const loadSuccess = createAction('[Storage Service] Cart Loaded Success', props<fromCart.State>());

export const loadFailure = createAction('[Storage Service] Cart Loading Failure');
