import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import StorageService from '../providers/storage.service';

@Injectable({ providedIn: 'root' })
class IsLoggedIn implements CanActivate {
    constructor(private storageService: StorageService, private router: Router) { }
    async canActivate(): Promise<boolean | UrlTree> {
        if (await this.storageService.get('isLoggedIn') !== true) {
            return this.router.createUrlTree(['/login']);
        }

        return true;
    }
}

export default IsLoggedIn;