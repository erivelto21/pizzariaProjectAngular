import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditPizzaService } from './edit-pizza.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private editPizzaService: EditPizzaService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (route.routeConfig.path === '') {
            this.router.navigate(['home']);
            return false;
        }

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

        if (!currentUser && route.routeConfig.path === 'payment') {
            this.router.navigate(['login']);
            return false;
        }

        if (this.cartLength() === 0 && route.routeConfig.path === 'payment') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentUser && route.routeConfig.path === 'orders') {
            this.router.navigate(['']);
            return false;
        }

        const flavor = this.editPizzaService.getValueFlavor();

        

        return true;
    }

    private cartLength(): number {
        const cart: [] = JSON.parse(localStorage.getItem('cart'));
        return cart.length;
    }
}
