import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCart from './cart.reducer';
import * as fromLogin from './login.reducer';


export interface State {
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromLogin.loginFeatureKey]: fromLogin.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromLogin.loginFeatureKey]: fromLogin.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
