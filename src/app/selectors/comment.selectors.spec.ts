import * as fromComment from '../reducers/comment.reducer';
import { selectCommentState } from './comment.selectors';

describe('Comment Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCommentState({
      [fromComment.commentFeatureKey]: fromComment.initialState
    });

    expect(result).toEqual(fromComment.initialState);
  });
});
