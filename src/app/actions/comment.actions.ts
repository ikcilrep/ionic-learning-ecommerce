import { createAction, props } from '@ngrx/store';
import ProductComment from '../models/product-comment.model';

export const postComment = createAction(
  '[Comment] Post Comment',
  props<{ comment: ProductComment }>());

export const postCommentSuccess = createAction(
  '[Comment] Post Comment Success',
  props<{ comment: ProductComment }>());

export const postCommentFailure = createAction(
  '[Comment] Post Comment Failure',
  props<{ error: any }>());

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

