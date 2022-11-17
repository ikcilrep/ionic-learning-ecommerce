import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { State } from '../reducers';
import * as fromLogin from '../selectors/login.selectors';

@Injectable({ providedIn: 'root' })
class IsNotLoggedIn implements CanActivate {
    constructor(private router: Router, private store: Store<State>) { }
    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(fromLogin.selectLoginState).pipe(filter((state) => state.isLoaded),
            map(state => {
                if (state.isLoggedIn) {
                    return this.router.createUrlTree(['/home']);
                } return true;
            }));
    }
}

export default IsNotLoggedIn;
