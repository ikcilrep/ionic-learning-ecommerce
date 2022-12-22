/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as CommentActions from '../actions/comment.actions';
import axios from 'axios';
import { serverAddress } from 'src/app-config';

@Injectable()
export class CommentEffects {

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(async (action) => {
        try {
          const response = await axios.get(`${serverAddress}/api/comments/${action.productId}`);
          if (response.status !== 200) {
            return CommentActions.loadCommentsFailure({ error: new Error(response.data) });
          }
          return CommentActions.loadCommentsSuccess({ comments: response.data, productId: action.productId });
        } catch (error) {
          return CommentActions.loadCommentsFailure({ error });
        }
      })
    );
  });

  postComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.postComment),
      switchMap(async (action) => {
        try {
          const response = await axios.post(`${serverAddress}/api/comments`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            action.comment, { headers: { 'Content-Type': 'application/json' } });
          if (response.status !== 200) {
            return CommentActions.postCommentFailure({ error: new Error(response.data) });
          }
          return CommentActions.postCommentSuccess({ comment: response.data });
        } catch (error) {
          return CommentActions.postCommentFailure({ error });
        }
      })
    );
  });

  constructor(private actions$: Actions) { }
}
