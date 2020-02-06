import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { OrderedPizza } from '../interfaces/ordered-pizza';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.getCurrentUserValue();

        if (currentUser && route.routeConfig.path === 'register') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentUser && route.routeConfig.path === 'checkout') {
            this.router.navigate(['login']);
            return false;
        }

        if (this.cartLength() === 0 && route.routeConfig.path === 'checkout') {
            this.router.navigate(['']);
            return false;
        }

        if (this.cartLength() === 0 && route.routeConfig.path === 'payment') {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }

    private cartLength(): number {
        const cart: [] = JSON.parse(localStorage.getItem('cart'));
        return cart.length;
    }
}
