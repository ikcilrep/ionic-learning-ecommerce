import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { autoLogInFailure, autoLogInSuccess, logInIfRemembered, saveLoginData } from '../actions/login.actions';
import StorageService from '../providers/storage.service';
import { selectLoginState } from '../selectors/login.selectors';

import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  let actions$: Observable<any>;
  let effects: LoginEffects;
  let storageServiceSpyObj: any;
  const email = 'user@example.com';
  beforeEach(() => {
    storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
        provideMockStore({ selectors: [{ selector: selectLoginState, value: { email, isLoggedIn: true, isLoaded: true } }] }),
        { provide: StorageService, useValue: storageServiceSpyObj }
      ]
    });

    effects = TestBed.inject(LoginEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('logInIfRemembered', () => {
    it('should return autoLoginFailure, if email is not in storage', (done: DoneFn) => {
      actions$ = of(logInIfRemembered());
      storageServiceSpyObj.get.and.returnValue(null);
      effects.logInIfRemembered$.subscribe(action => {
        expect(action).toEqual(autoLogInFailure());
        done();
      });
    });

    it('should return autoLoginSuccess with the given email, if email is in storage', (done: DoneFn) => {
      actions$ = of(logInIfRemembered());
      storageServiceSpyObj.get.and.returnValue(email);
      effects.logInIfRemembered$.subscribe(action => {
        expect(action).toEqual(autoLogInSuccess({ email }));
        done();
      });
    });
  });

  describe('saveLoginData', () => {
    it('should save the provided email in storage', (done: DoneFn) => {
      actions$ = of(saveLoginData());
      effects.saveLoginData$.subscribe(() => {
        expect(storageServiceSpyObj.set).toHaveBeenCalledOnceWith('email', email);
        done();
      });
    });
  });
});
