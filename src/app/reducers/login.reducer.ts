import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface State {
  readonly isLoggedIn: boolean;
  readonly email: string | null;
}

export const initialState: State = {
  isLoggedIn: false,
  email: null
};

export const reducer = createReducer(
  initialState,

  on(LoginActions.logIn, (_state, { email }) => {
    console.log('Logging in');
    console.log(email);
    return ({ isLoggedIn: true, email });
  }),
);
