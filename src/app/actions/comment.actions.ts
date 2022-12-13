import { createAction, props } from '@ngrx/store';
import ProductComment from '../models/product-comment.model';

export const loadComments = createAction(
  '[Comment] Load Comments', props<{ productId: number }>()
);

export const loadCommentsSuccess = createAction(
  '[Comment] Load Comments Success',
  props<{ comments: ProductComment[]; productId: number }>()
);

export const loadCommentsFailure = createAction(
  '[Comment] Load Comments Failure',
  props<{ error: any }>()
);

