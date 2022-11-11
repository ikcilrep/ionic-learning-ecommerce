import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/db';

export const addItem = createAction('[Cart] Add CartItem', props<Product>());
