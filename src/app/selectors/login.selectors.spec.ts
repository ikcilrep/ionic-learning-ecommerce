import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromLogin from '../reducers/login.reducer';
import { selectLoginState } from './login.selectors';

describe('Login Selectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideMockStore()] });
  });
  it('should select the feature state', () => {
    const result = selectLoginState({
      [fromLogin.loginFeatureKey]: fromLogin.initialState
    });

    expect(result).toEqual(fromLogin.initialState);
  });
});
