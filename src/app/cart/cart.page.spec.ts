import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromCart from '../reducers/cart.reducer';
import { selectCartItems, selectCartTotalPrice } from '../selectors/cart.selectors';
import { CartPage } from './cart.page';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let routerSpyObj: any;

  beforeEach(waitForAsync(() => {
    routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [CartPage],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({
        initialState: { cart: fromCart.initialState },
        selectors: [{ selector: selectCartTotalPrice, value: 0 }, { selector: selectCartItems, value: [] }],
      }), { provide: Router, useValue: routerSpyObj }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToHome', () => {
    it('should navigate to /home', () => {
      component.goToHome();
      expect(routerSpyObj.navigate).toHaveBeenCalledOnceWith(['/home']);
    });
  });
});
