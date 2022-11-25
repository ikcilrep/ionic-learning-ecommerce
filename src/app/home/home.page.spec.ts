import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import StorageService from '../providers/storage.service';
import * as fromCart from '../reducers/cart.reducer';
import { selectCartItems, selectNumberOfItems } from '../selectors/cart.selectors';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let routerSpyObj: Router;

  beforeEach(waitForAsync(() => {
    const storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({
        initialState: { cart: fromCart.initialState },
        selectors: [{ selector: selectNumberOfItems, value: 0 }, { selector: selectCartItems, value: [] }]
      }),
      { provide: StorageService, useValue: storageServiceSpyObj },
      { provide: Router, useValue: routerSpyObj }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToCart', () => {
    it('should navigate to cart', () => {
      component.goToCart();
      expect(routerSpyObj.navigate).toHaveBeenCalledOnceWith(['/cart']);
    });
  });
});
