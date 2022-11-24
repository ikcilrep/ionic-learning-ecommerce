import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as CartActions from '../../actions/cart.actions';
import { products } from 'src/app/db';
import { State } from 'src/app/reducers';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: Store<State>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = products[0];
    store = TestBed.inject(Store);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', () => {
    beforeEach(() => {
      spyOn(store, 'dispatch');
    });

    it('should dispatch addProductToCart with the component\'s product', () => {
      component.addToCart();
      expect(store.dispatch).toHaveBeenCalledWith(CartActions.addProductToCart(component.product));
    });

    it('should dispatch saveCart', () => {
      component.addToCart();
      expect(store.dispatch).toHaveBeenCalledWith(CartActions.saveCart());
    });
  });
});
