import { TestBed, waitForAsync } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { State } from '../reducers';
import { selectLoginState } from '../selectors/login.selectors';
import IsLoggedIn from './is-logged-in.guard';

describe('IsLoggedIn', () => {
    let isLoggedInGuard: IsLoggedIn;
    let mockStore: MockStore<State>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [IsLoggedIn,
                provideMockStore()]
        }).compileComponents();

        isLoggedInGuard = TestBed.inject(IsLoggedIn);
        mockStore = TestBed.inject(MockStore<State>);
    }));

    describe('canActivate', () => {
        it('should return redirection to /login, if not logged in and loaded', (done: DoneFn) => {
            mockStore.overrideSelector(selectLoginState, { email: null, isLoggedIn: false, isLoaded: true });
            isLoggedInGuard.canActivate().subscribe(result => {
                expect(result).toBeInstanceOf(UrlTree);
                expect((result as UrlTree).toString()).toBe('/login');
                done();
            });
        });

        it('should return true, if logged in and loaded', (done: DoneFn) => {
            mockStore.overrideSelector(selectLoginState, { email: 'user@example.com', isLoggedIn: true, isLoaded: true });
            isLoggedInGuard.canActivate().subscribe(result => {
                expect(result).toBeTrue();
                done();
            });
        });
    });
});
