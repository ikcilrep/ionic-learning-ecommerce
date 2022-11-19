import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import StorageService from '../providers/storage.service';
import * as fromCart from '../reducers/cart.reducer';
import { selectCartItems, selectNumberOfItems } from '../selectors/cart.selectors';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    const storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore({
        initialState: { cart: fromCart.initialState },
        selectors: [{ selector: selectNumberOfItems, value: 0 }, { selector: selectCartItems, value: [] }]
      }),
      { provide: StorageService, useValue: storageServiceSpyObj }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
