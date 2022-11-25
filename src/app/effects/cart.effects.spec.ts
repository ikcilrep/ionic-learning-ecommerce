import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { loadCart, loadFailure, loadSuccess, saveCart } from '../actions/cart.actions';
import StorageService from '../providers/storage.service';
import { initialState } from '../reducers/cart.reducer';
import { selectCartState } from '../selectors/cart.selectors';
import { CartEffects } from './cart.effects';

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let storageServiceSpyObj: any;

  beforeEach(() => {
    storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        provideMockStore({ selectors: [{ selector: selectCartState, value: initialState }] }),
        { provide: StorageService, useValue: storageServiceSpyObj }
      ]
    });
    effects = TestBed.inject(CartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCart$', () => {
    it('should return loadFailure, if cart is not in storage', (done: DoneFn) => {
      actions$ = of(loadCart());
      storageServiceSpyObj.get.and.returnValue(null);
      effects.loadCart$.subscribe(action => {
        expect(action).toEqual(loadFailure());
        done();
      });
    });

    it('should return loadSuccess with the stored cart, if cart is in storage', (done: DoneFn) => {
      actions$ = of(loadCart());
      storageServiceSpyObj.get.and.returnValue(JSON.stringify(initialState));
      effects.loadCart$.subscribe(action => {
        expect(action).toEqual(loadSuccess(initialState));
        done();
      });
    });
  });

  describe('saveCart$', () => {
    it('should save the provided cart in storage', (done: DoneFn) => {
      actions$ = of(saveCart());
      const serializedCart = JSON.stringify(initialState);
      effects.saveCart$.subscribe(() => {
        expect(storageServiceSpyObj.set).toHaveBeenCalledOnceWith('cart', serializedCart);
        done();
      });
    });
  });
});
