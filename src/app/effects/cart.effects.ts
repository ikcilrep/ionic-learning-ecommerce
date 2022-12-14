import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, tap } from 'rxjs/operators';
import * as CartActions from '../actions/cart.actions';
import { selectCartState } from '../selectors/cart.selectors';
import StorageService from '../providers/storage.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers';


@Injectable()
export class CartEffects {
  loadCart$ = createEffect(
    () => this.actions$.pipe(ofType(CartActions.loadCart),
      mergeMap(async () => {
        const cartString = await this.storageService.get('cart');
        if (cartString === null) {
          return CartActions.loadFailure();
        }
        const cart = JSON.parse(cartString);
        return CartActions.loadSuccess(cart);
      })
    ));

  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CartActions.saveCart),
        concatLatestFrom(_action => this.store.select(selectCartState)),
        tap(async ([_action, cart]) => {
          await this.storageService.set('cart', JSON.stringify(cart));
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private storageService: StorageService, private store: Store<State>) { }
}
