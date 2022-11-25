import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { loadCart } from './actions/cart.actions';
import { logInIfRemembered } from './actions/login.actions';

import { AppComponent } from './app.component';
import { State } from './reducers';

describe('AppComponent', () => {
  let store: Store<State>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore()]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should log in on init, if remembered', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(logInIfRemembered());
  });

  it('should load cart on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(loadCart());
  });
});
