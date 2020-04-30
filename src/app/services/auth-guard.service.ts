import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EditPizzaService } from './edit-pizza.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private editPizzaService: EditPizzaService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentAccount = JSON.parse(localStorage.getItem('currentAccount'));

        if (route.routeConfig.path === '') {
            this.router.navigate(['home']);
            return false;
        }

        if (currentAccount && route.routeConfig.path === 'register') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentAccount && route.routeConfig.path === 'checkout') {
            this.router.navigate(['login']);
            return false;
        }

        if (this.cartLength() === 0 && route.routeConfig.path === 'checkout') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentAccount && route.routeConfig.path === 'payment') {
            this.router.navigate(['login']);
            return false;
        }

        if (this.cartLength() === 0 && route.routeConfig.path === 'payment') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentAccount && route.routeConfig.path === 'orders') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentAccount && route.routeConfig.path === 'favorites') {
            this.router.navigate(['']);
            return false;
        }

        if (!currentAccount && route.routeConfig.path === 'mydata') {
            this.router.navigate(['']);
            return false;
        }

        const flavor = this.editPizzaService.getValueFlavor();

        if ((this.editPizzaService.getValueFlavor() === null && this.editPizzaService.getValueOrderedPizza() === null)
        && route.routeConfig.path === 'edit') {
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
