import { Injectable } from '@angular/core';
import { concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import StorageService from 'src/app/providers/storage.service';
import { mergeMap, tap } from 'rxjs/operators';
import { loadFailure, loadSuccess } from '../actions/cart.action';
import AppState from '../models/app-state.models';
import { selectCartState } from '../reducers/cart.selector';

@Injectable()
export class CartEffects {
    loadCart$ = createEffect(
        () => this.actions$.pipe(ofType('[Cart] Load Cart'),
            mergeMap(async () => {
                const cartString = await this.storageService.get('cart');
                if (cartString === null) {
                    return loadFailure();
                }
                const cart = JSON.parse(cartString);
                return loadSuccess(cart);
            })
        ));

    saveCart$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType('[Cart] Save Cart'),
                concatLatestFrom(_action => this.store.select(selectCartState)),
                tap(async ([_action, cart]) => {
                    await this.storageService.set('cart', JSON.stringify(cart));
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: ActionsSubject, private storageService: StorageService, private store: Store<AppState>) { }
}
