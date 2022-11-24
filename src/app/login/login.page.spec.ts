import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule, ToastController } from '@ionic/angular';

import { LoginPage } from './login.page';
import StorageService from '../providers/storage.service';
import { Router } from '@angular/router';
import { users } from '../db';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { logInSuccess, saveLoginData } from '../actions/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let routerSpyObj: any;
  let toastControllerSpyObj: any;
  let store: Store<State>;

  beforeEach(waitForAsync(() => {
    routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    toastControllerSpyObj = jasmine.createSpyObj('ToastController', ['create']);
    const storageServiceSpyObj = jasmine.createSpyObj('StorageService', ['set', 'get']);
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [provideMockStore(),
      { provide: StorageService, useValue: storageServiceSpyObj },
      { provide: Router, useValue: routerSpyObj },
      { provide: ToastController, useValue: toastControllerSpyObj },
      ]
    }).compileComponents();

    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logIn', () => {
    it('should navigate to /home, if credentials are valid', () => {
      component.email = users[0].email;
      component.password = users[0].password;
      component.logIn();
      expect(routerSpyObj.navigate).toHaveBeenCalledOnceWith(['/home']);
    });

    it('should dispatch login success with the given email, if credentials are valid', () => {
      spyOn(store, 'dispatch');
      component.email = users[0].email;
      component.password = users[0].password;
      component.logIn();
      expect(store.dispatch).toHaveBeenCalledWith(logInSuccess({ email: component.email }));
    });

    it('should dispatch save login data, if credentials are valid', () => {
      spyOn(store, 'dispatch');
      component.email = users[0].email;
      component.password = users[0].password;
      component.logIn();
      expect(store.dispatch).toHaveBeenCalledWith(saveLoginData());
    });

    it('should present a failure toast, if credentials are invalid', () => {
      spyOn(component, 'presentLoginFailedToast');
      component.email = '';
      component.password = '';
      component.logIn();
      expect(component.presentLoginFailedToast).toHaveBeenCalled();
    });
  });
});
