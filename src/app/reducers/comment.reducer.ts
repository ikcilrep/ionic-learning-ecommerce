import { createReducer, on } from '@ngrx/store';
import * as CommentActions from '../actions/comment.actions';
import ProductComment from '../models/product-comment.model';

export const commentFeatureKey = 'comment';

export interface State {
  comments: ProductComment[];
}

export const initialState: State = {
  comments: []
};

export const reducer = createReducer(
  initialState,

  on(CommentActions.loadCommentsSuccess, (state, action) => ({
    comments: [...state.comments.filter(comment => comment.productId !== action.productId), ...action.comments]
  })),
  on(CommentActions.loadCommentsFailure, (state, _action) => state),
  on(CommentActions.postCommentSuccess, (state, action) => ({ comments: [...state.comments, action.comment] })),
  on(CommentActions.postCommentFailure, (state, _action) => state),
);
