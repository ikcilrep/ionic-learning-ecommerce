import { reducer, initialState, commentFeatureKey } from './comment.reducer';
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

    it('should return an array containing all other products\' comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(otherProductsComments));
    });

    it('should return an array containing new product comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(newProductComments));
    });

    it('should return an array not containing old product comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsSuccess({
        comments: newProductComments, productId
      }));

      expect(result.comments).not.toEqual(jasmine.arrayContaining(productComments));
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

  describe('postCommentSuccess', () => {
    const productId = 0;
    const existingComments = [
      { id: '0', userId: 2, productId, text: 'Testing comment 1', createdAt: undefined },
      { id: '1', userId: 3, productId, text: 'Testing comment 2', createdAt: undefined },
    ];
    const newComment = { id: '2', userId: 4, productId, text: 'Testing comment 3', createdAt: undefined };

    it('should return a new comments instance', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.postCommentSuccess({
        comment: newComment
      }));

      expect(result.comments).not.toBe(existingComments);
    });

    it('should return an array containing all previous comments', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.postCommentSuccess({
        comment: newComment
      }));

      expect(result.comments).toEqual(jasmine.arrayContaining(existingComments));
    });

    it('should return an array containing the new comment', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.postCommentSuccess({
        comment: newComment
      }));

      expect(result.comments).toContain(newComment);
    });

    it('should return an array with length increased by one', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.postCommentSuccess({
        comment: newComment
      }));
      expect(result.comments.length).toBe(existingComments.length + 1);
    });
  });

  describe('postCommentFailure', () => {
    const productId = 0;
    const existingComments = [
      { id: '0', userId: 2, productId, text: 'Testing comment 1', createdAt: undefined },
      { id: '1', userId: 3, productId, text: 'Testing comment 2', createdAt: undefined },
    ];

    it('should return the state unchanged', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.postCommentFailure(undefined));

      expect(result.comments).toEqual(existingComments);
    });
  });

  describe('loadCommentFailure', () => {
    const productId = 0;
    const existingComments = [
      { id: '0', userId: 2, productId, text: 'Testing comment 1', createdAt: undefined },
      { id: '1', userId: 3, productId, text: 'Testing comment 2', createdAt: undefined },
    ];

    it('should return the state unchanged', () => {
      const result = reducer({
        comments: existingComments
      }, CommentActions.loadCommentsFailure(undefined));

      expect(result.comments).toEqual(existingComments);
    });
  });
});
