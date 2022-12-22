import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { serverAddress } from 'src/app-config';
import { loadComments, loadCommentsFailure, loadCommentsSuccess } from '../actions/comment.actions';

import { CommentEffects } from './comment.effects';

describe('CommentEffects', () => {
  let actions$: Observable<any>;
  let effects: CommentEffects;
  let axiosGetSpy: jasmine.Spy;
  let axiosPostSpy: jasmine.Spy;
  const productId = 0;
  const comments = [{ id: '0', userId: 2, productId, text: 'Testing comment 1', createdAt: undefined },
  { id: '1', userId: 3, productId, text: 'Testing comment 2', createdAt: undefined },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentEffects,
        provideMockActions(() => actions$)
      ]
    });

    axiosGetSpy = spyOn(axios, 'get');
    axiosPostSpy = spyOn(axios, 'post');

    effects = TestBed.inject(CommentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadComments', () => {
    it('should make a get request to the api with the product id', (done: DoneFn) => {
      actions$ = of(loadComments({ productId }));
      effects.loadComments$.subscribe(() => {
        expect(axiosGetSpy).toHaveBeenCalledOnceWith(`${serverAddress}/api/comments/${productId}`);
        done();
      });
    });

    it('should return loadCommentsSuccess with returned comments, if the request was successful', (done: DoneFn) => {
      actions$ = of(loadComments({ productId }));
      axiosGetSpy.and.returnValue({ data: comments, status: 200 });
      effects.loadComments$.subscribe((action) => {
        expect(action).toEqual(loadCommentsSuccess({
          comments,
          productId: 0
        }));
        done();
      });
    });

    it('should return loadCommentsFailure, if the request was unsuccessful', (done: DoneFn) => {
      actions$ = of(loadComments({ productId }));
      const errorMessage = 'Some error';
      axiosGetSpy.and.returnValue({ data: errorMessage, status: 404 });
      effects.loadComments$.subscribe((action) => {
        expect(action).toEqual(loadCommentsFailure({ error: new Error(errorMessage) }));
        done();
      });
    });

    it('should return loadCommentsFailure, if the request threw an error', (done: DoneFn) => {
      actions$ = of(loadComments({ productId }));
      const errorMessage = 'Some error';
      axiosGetSpy.and.throwError(errorMessage);
      effects.loadComments$.subscribe((action) => {
        expect(action).toEqual(loadCommentsFailure({ error: new Error(errorMessage) }));
        done();
      });
    });
  });
});
