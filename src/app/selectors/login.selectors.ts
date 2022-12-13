import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers/login.reducer';
import * as db from 'src/app/db';

export const selectLoginState = createFeatureSelector<fromLogin.State>(
  fromLogin.loginFeatureKey
);

export const selectUserId = createSelector(selectLoginState,
  state => db.users.find(user => user.email === state.email).id);
