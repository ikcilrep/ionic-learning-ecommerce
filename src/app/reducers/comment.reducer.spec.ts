import { reducer, initialState, commentFeatureKey, State } from './comment.reducer';
import * as CommentActions from 'src/app/actions/comment.actions';

describe('Comment Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadCommentsSuccess', () => {
    const productId = 0;
    const newProductComments = [
      { id: '4', userId: 0, productId, text: 'Testing comment 5', createdAt: undefined },
      { id: '5', userId: 1, productId, text: 'Testing comment 6', createdAt: undefined },

    ];
    const productComments = [
      { id: '0', userId: 2, productId, text: 'Testing comment 1', createdAt: undefined },
      { id: '1', userId: 3, productId, text: 'Testing comment 2', createdAt: undefined },

    ];

    const otherProductsComments = [
      { id: '2', userId: 4, productId: productId + 1, text: 'Testing comment 3', createdAt: undefined },
      { id: '3', userId: 5, productId: productId + 2, text: 'Testing comment 4', createdAt: undefined }
    ];

    const existingComments = [...productComments, ...otherProductsComments];

    it('should return a new comments instance', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).not.toBe(existingComments);
    });

    it('should return array containing all other products\' comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(otherProductsComments));
    });

    it('should return array containing new product comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(newProductComments));
    });

    it('should return array containing old product comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(productComments));
    });

    it('should not add repetetive comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: productComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayWithExactContents(existingComments));
    });
  });
});
