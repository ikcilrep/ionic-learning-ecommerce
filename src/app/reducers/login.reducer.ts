import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface State {
  readonly isLoggedIn: boolean;
  readonly isLoaded: boolean;
  readonly email: string | null;
}

export const initialState: State = {
  isLoggedIn: false,
  isLoaded: false,
  email: null
};

export const reducer = createReducer(
  initialState,

  on(LoginActions.logInSuccess, (_state, { email }) => ({ isLoggedIn: true, isLoaded: true, email })),
  on(LoginActions.autoLogInSuccess, (_state, { email }) => ({ isLoggedIn: true, isLoaded: true, email })),
  on(LoginActions.autoLogInFailure, (_state) => ({ email: null, isLoggedIn: false, isLoaded: true })),
);
