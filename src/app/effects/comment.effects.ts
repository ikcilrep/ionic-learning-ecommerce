/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as CommentActions from '../actions/comment.actions';
import axios from 'axios';
import { serverAddress } from '../app.module';

@Injectable()
export class CommentEffects {

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(async (action) => {
        try {
          const response = await axios.get(`${serverAddress}/api/comments/${action.productId}`);
          return CommentActions.loadCommentsSuccess({ comments: response.data, productId: action.productId });
        } catch (error) {
          return CommentActions.loadCommentsFailure(error);
        }
      })
    );
  });


  constructor(private actions$: Actions) { }
}
