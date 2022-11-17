/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as LoginActions from '../actions/login.actions';
import * as fromLoginData from '../selectors/login.selectors';
import StorageService from '../providers/storage.service';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {


  logInIfRemembered$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logInIfRemembered),

      mergeMap(async () => {
        const email = await this.storageService.get('email');
        if (email === null) {
          return LoginActions.logInFailure();
        }
        return LoginActions.logInSuccess({ email });
      }
      ));
  });


  saveLoginData$ = createEffect(() => this.actions$.pipe(ofType(LoginActions.saveLoginData),
    concatLatestFrom(_action => this.store.select(fromLoginData.selectLoginState)), tap(async ([_action, { email }]) => {
      await this.storageService.set('email', email);
    })
  ), { dispatch: false });
  constructor(private actions$: Actions, private storageService: StorageService, private store: Store<State>, private router: Router) { }
}
