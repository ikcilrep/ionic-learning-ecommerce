import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as LoginActions from './actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>) { }
  ngOnInit(): void {
    this.store.dispatch(LoginActions.logInIfRemembered());
  }
}
