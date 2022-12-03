import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/reducers';
import { selectNumberOfItems } from 'src/app/selectors/cart.selectors';
import * as CartActions from 'src/app/actions/cart.actions';
import { ProductPagePage } from './product-page.page';

describe('ProductPagePage', () => {
  let component: ProductPagePage;
  let fixture: ComponentFixture<ProductPagePage>;
  let mockStore: MockStore<State>;
  let routerSpyObj: Router;
  const productId = 0;

  beforeEach(waitForAsync(() => {
    routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ProductPagePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: productId } } } },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore<State>);
    mockStore.overrideSelector(selectNumberOfItems, 1);
    fixture = TestBed.createComponent(ProductPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find a product with the given id', () => {
    expect(component.product.id).toBe(productId);
  });

  describe('addToCart', () => {
    beforeEach(() => {
      spyOn(mockStore, 'dispatch');
    });

    it('should dispatch addProductToCart with the component\'s product', () => {
      component.addToCart();
      expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.addProductToCart(component.product));
    });

    it('should dispatch saveCart', () => {
      component.addToCart();
      expect(mockStore.dispatch).toHaveBeenCalledWith(CartActions.saveCart());
    });
  });


  describe('goToCart', () => {
    it('should navigate to cart', () => {
      component.goToCart();
      expect(routerSpyObj.navigate).toHaveBeenCalledOnceWith(['/cart']);
    });
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });
});
