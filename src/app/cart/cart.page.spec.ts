import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromCart from '../reducers/cart.reducer';
import { selectCartItems, selectCartTotalPrice } from '../selectors/cart.selectors';
import { CartPage } from './cart.page';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CartPage],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({
        initialState: { cart: fromCart.initialState },
        selectors: [{ selector: selectCartTotalPrice, value: 0 }, { selector: selectCartItems, value: [] }]
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
