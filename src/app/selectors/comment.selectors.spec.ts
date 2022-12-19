import * as fromComment from '../reducers/comment.reducer';
import { selectCommentState, selectProductComments } from './comment.selectors';

describe('Comment Selectors', () => {
  describe('selectCommentState', () => {
    it('should select the feature state', () => {
      const result = selectCommentState({
        [fromComment.commentFeatureKey]: fromComment.initialState
      });

      expect(result).toEqual(fromComment.initialState);
    });
  });


  describe('selectProductComments', () => {
    it('should select the comments of the specific product', () => {
      const specificProductId = 0;
      const anotherProductId = 1;
      const specificProductComments = [
        { id: 0, userId: 0, productId: specificProductId, text: 'Testing comment 1' },
        { id: 1, userId: 0, productId: specificProductId, text: 'Testing comment 2' },

      ];
      const anotherProductComments = [
        { id: 2, userId: 0, productId: anotherProductId, text: 'Testing comment 3' }
      ];
      const result = selectProductComments(0)({
        [fromComment.commentFeatureKey]: {
          comments: [
            ...specificProductComments,
            ...anotherProductComments
          ]
        }
      });

      expect(result).toEqual(jasmine.arrayWithExactContents(specificProductComments));
    });
  });
});

