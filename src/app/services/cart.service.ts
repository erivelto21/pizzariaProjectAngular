import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';
import { EditPizzaService } from './edit-pizza.service';
import { FlavorService } from './flavor.service';
import { CustomFlavor } from '../classes/custom-flavor';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<Pizza[]>();

  constructor(private editPizzaService: EditPizzaService,
              private flavorService: FlavorService,
              private alertService: AlertService) { }

  get(): Observable<Pizza[]> {
    if (localStorage.getItem('cart') === null) {
      this.newCart();
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.cartSubject.next(cart);
    }

    return this.cartSubject.asObservable();
  }

  newCart() {
    const cart: Pizza[] = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  add(customFlavor: CustomFlavor) {
    let cart: Pizza[] = JSON.parse(localStorage.getItem('cart'));

    if (this.editPizzaService.getValueOrderedPizza() !== null && !this.anyEqual(cart, customFlavor)) {
      this.findCartItemForUpdate(cart, customFlavor);
      return;
    }

    if (this.editPizzaService.getValueOrderedPizza() !== null &&
    this.anyEqual(cart, this.editPizzaService.getValueOrderedPizza().customFlavor)) {
      this.remove(this.editPizzaService.getValueOrderedPizza());
      this.editPizzaService.clearOrderedPizza();
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    this.checkOccurrence(customFlavor, cart);
    this.updateCart(cart);
    this.alertService.addCart(true);
  }

  private anyEqual(cart: Pizza[], customFlavor: CustomFlavor): boolean {
    for (const i of cart) {
      if (!this.isDifferent(customFlavor, i)) {
        return true;
      }
    }

    return false;
  }

  private findCartItemForUpdate(cart: Pizza[], customFlavor: CustomFlavor) {
    const orderedPizza = this.editPizzaService.getValueOrderedPizza();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cart.length; i ++) {
      if (!this.isDifferent(orderedPizza.customFlavor, cart[i])) {

        this.updateCartItem(cart, i, customFlavor);

        return;
      }
    }
  }

  private updateCartItem(cart: Pizza[], position: number, customFlavor: CustomFlavor) {
    cart[position].customFlavor = customFlavor;
    cart[position].customFlavor.additionalsValue = this.flavorService.calculateAdditionals(customFlavor.ingredients);

    this.editPizzaService.clearOrderedPizza();

    this.alertService.editCartItem(true);

    this.updateCart(cart);
  }

  private updateCart(cart: Pizza[]) {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private checkOccurrence(customFlavor1: CustomFlavor, cart: Pizza[]) {
    const aux = cart.findIndex((i: Pizza) => customFlavor1.name === i.customFlavor.name );

    for (const orderedPizza of cart) {
      if (!this.isDifferent(customFlavor1, orderedPizza)) {
        orderedPizza.amount++;
        return;
      }
    }

    const orderedPizza1: Pizza = {id: 0, customFlavor : customFlavor1, amount : 1};

    cart.push(orderedPizza1);
    this.updateCart(cart);
  }

  private isDifferent(customFlavor: CustomFlavor, item2: Pizza): boolean {
    const amountOfIngredients = item2.customFlavor.ingredients.length;
    let amountOfIngredientsEqual = 0;

    for (const i of customFlavor.ingredients) {
      for (const i2 of item2.customFlavor.ingredients) {
        if (i.name === i2.name) {
          if (i.amount === i2.amount) {
            amountOfIngredientsEqual++;
          }
        }
      }
    }

    if (amountOfIngredientsEqual === amountOfIngredients) {
      return false;
    }
    return true;
  }

  remove(item: Pizza) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const aux = cart.findIndex((i: Pizza) => !this.isDifferent(item.customFlavor, i));
    cart.splice(aux, 1);
    this.updateCart(cart);
  }
}
