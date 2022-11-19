import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import StorageService from '../providers/storage.service';

import { CartEffects } from './cart.effects';

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;

  beforeEach(() => {
    const storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: StorageService, useValue: storageServiceSpyObj }
      ]
    });

    effects = TestBed.inject(CartEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
