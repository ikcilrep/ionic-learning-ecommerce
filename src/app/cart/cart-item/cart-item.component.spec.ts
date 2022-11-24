import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { incrementProductAmount, saveCart, subtractProductAmount } from 'src/app/actions/cart.actions';
import { products } from 'src/app/db';
import { State } from 'src/app/reducers';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let store: Store<State>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = { amount: 2, product: products[1] };
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displayablePrice', () => {
    it('should return the price with 2 decimal places ending with "zł"', () => {
      const result = component.displayablePrice;
      expect(result).toBe('0.40zł');
    });
  });

  describe('incrementProductAmount', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });
    it('should dispatch incrementProductAmount with the component\'s product', () => {
      component.incrementProductAmount();
      expect(store.dispatch).toHaveBeenCalledWith(incrementProductAmount(component.item.product));
    });

    it('should dispatch saveCart', () => {
      component.incrementProductAmount();
      expect(store.dispatch).toHaveBeenCalledWith(saveCart());
    });
  });

  describe('subtractProductAmount', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });
    it('should dispatch incrementProductAmount with the component\'s product and given amountToSubtract', () => {
      component.subtractProductAmount(1);
      expect(store.dispatch).toHaveBeenCalledWith(subtractProductAmount({ product: component.item.product, amountToSubtract: 1 }));
    });

    it('should dispatch saveCart', () => {
      component.subtractProductAmount(1);
      expect(store.dispatch).toHaveBeenCalledWith(saveCart());
    });
  });

});
