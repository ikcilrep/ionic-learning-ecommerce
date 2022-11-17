import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromLogin from '../selectors/login.selectors';
import { State } from '../reducers';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
class IsLoggedIn implements CanActivate {
    constructor(private router: Router, private store: Store<State>) { }
    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(fromLogin.selectLoginState).pipe(filter(state => state.isLoaded),
            map(state => {
                if (!state.isLoggedIn) {
                    return this.router.createUrlTree(['/login']);
                }
                return true;
            }));
    }
}

export default IsLoggedIn;
