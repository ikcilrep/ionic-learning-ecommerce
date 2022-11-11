import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import StorageService from '../providers/storage.service';
import { users } from '../db';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  logIn(): void {
    const user = users.find((u) => u.email === this.email);
    if (user !== undefined && user.password === this.password) {
      this.storageService.set('isLoggedIn', true);
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
