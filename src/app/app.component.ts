import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as LoginActions from './actions/login.actions';
import * as CartActions from './actions/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>) { }
  ngOnInit(): void {
    this.store.dispatch(LoginActions.logInIfRemembered());
    this.store.dispatch(CartActions.loadCart());
  }
}
