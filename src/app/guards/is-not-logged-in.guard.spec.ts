import { TestBed, waitForAsync } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../reducers';
import { selectLoginState } from '../selectors/login.selectors';
import IsNotLoggedIn from './is-not-logged-in.guard';

describe('IsNotLoggedIn', () => {
    let isNotLoggedInGuard: IsNotLoggedIn;
    let mockStore: MockStore<State>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [IsNotLoggedIn,
                provideMockStore()]
        }).compileComponents();

        isNotLoggedInGuard = TestBed.inject(IsNotLoggedIn);
        mockStore = TestBed.inject(MockStore<State>);
    }));

    describe('canActivate', () => {
        it('should return redirection to /home, if logged in and loaded', (done: DoneFn) => {
            mockStore.overrideSelector(selectLoginState, { email: 'user@example.com', isLoggedIn: true, isLoaded: true });
            isNotLoggedInGuard.canActivate().subscribe(result => {
                expect(result).toBeInstanceOf(UrlTree);
                expect((result as UrlTree).toString()).toBe('/home');
                done();
            });
        });

        it('should return true, if not logged in and loaded', (done: DoneFn) => {
            mockStore.overrideSelector(selectLoginState, { email: null, isLoggedIn: false, isLoaded: true });
            isNotLoggedInGuard.canActivate().subscribe(result => {
                expect(result).toBeTrue();
                done();
            });
        });
    });

    afterEach(() => {
        mockStore.resetSelectors();
    });
});

