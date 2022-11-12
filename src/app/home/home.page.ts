import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import AppState from '../store/models/app-state.models';
import { selectNumberOfItems } from '../store/reducers/cart.selector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  numberOfItems$: Observable<number>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.numberOfItems$ = this.store.select(selectNumberOfItems);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
