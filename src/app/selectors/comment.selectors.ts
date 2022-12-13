import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromComment from '../reducers/comment.reducer';

export const selectCommentState = createFeatureSelector<fromComment.State>(
  fromComment.commentFeatureKey
);


export const selectProductComments = (productId: number) => createSelector(selectCommentState,
  (state) => state.comments.filter(comment => comment.productId.toString() === productId.toString()));
