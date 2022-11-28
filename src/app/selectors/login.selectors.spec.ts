import { selectLoginState } from './login.selectors';
import * as fromLogin from '../reducers/login.reducer';

describe('Login Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLoginState({
      [fromLogin.loginFeatureKey]: fromLogin.initialState
    });

    expect(result).toEqual(fromLogin.initialState);
  });
});
