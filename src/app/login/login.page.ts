import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import StorageService from '../providers/storage.service';
import { users } from '../db';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as LoginActions from '../actions/login.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, private storageService: StorageService,
    private store: Store<State>) { }

  logIn(): void {
    const user = users.find((u) => u.email === this.email);
    if (user !== undefined && user.password === this.password) {
      this.store.dispatch(LoginActions.logInSuccess({ email: user.email }));
      this.store.dispatch(LoginActions.saveLoginData());
      this.router.navigate(['/home']);
    } else {
      this.presentLoginFailedToast();
    }
  }

  async presentLoginFailedToast() {
    const toast = await this.toastController.create({
      message: 'Wrong email or password!',
      duration: 1500,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }
}
