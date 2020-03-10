import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';
import { EditPizzaService } from './edit-pizza.service';
import { AlertService } from './alert.service';
import { PizzaService } from './pizza.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<Pizza[]>();

  constructor(private editPizzaService: EditPizzaService,
              private pizzaService: PizzaService,
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

  add(pizza: Pizza) {
    const cart: Pizza[] = JSON.parse(localStorage.getItem('cart'));

    const aux = cart.findIndex((i: Pizza) => pizza.customFlavor.name === i.customFlavor.name );

    if (aux === -1) {
      cart.push(pizza);
      this.updateCart(cart);
      this.alertService.addCart(true);
      return;
    }

    this.checkOccurrence(pizza, cart);
    this.updateCart(cart);
    this.alertService.addCart(true);
  }

  updateItem(pizza: Pizza) {
    const cart: Pizza[] = JSON.parse(localStorage.getItem('cart'));
    this.findCartItemForUpdate(cart, pizza);
  }

  private findCartItemForUpdate(cart: Pizza[], pizza: Pizza) {
    const orderedPizza = this.editPizzaService.getValueOrderedPizza();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cart.length; i ++) {
      if (!this.isDifferent(orderedPizza, cart[i])) {

        this.updateCartItem(cart, i, pizza);

        return;
      }
    }
  }

  private updateCartItem(cart: Pizza[], position: number, pizza: Pizza) {
    cart[position] = pizza;
    cart[position].additionalsValue = this.pizzaService.calculateAdditionals(pizza);

    this.editPizzaService.clearOrderedPizza();

    this.alertService.editCartItem(true);

    this.updateCart(cart);
  }

  private updateCart(cart: Pizza[]) {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private checkOccurrence(pizza: Pizza, cart: Pizza[]) {
    for (const orderedPizza of cart) {
      if (!this.isDifferent(pizza, orderedPizza)) {
        orderedPizza.amount++;
        return;
      }
    }

    cart.push(pizza);
    this.updateCart(cart);
  }

  private isDifferent(pizza: Pizza, item2: Pizza): boolean {
    const amountOfIngredients = item2.customFlavor.ingredients.length;
    let amountOfIngredientsEqual = 0;

    for (const i of pizza.customFlavor.ingredients) {
      for (const i2 of item2.customFlavor.ingredients) {
        if (i.name === i2.name) {
          if (i.amount === i2.amount) {
            amountOfIngredientsEqual++;
          }
        }
      }
    }

    let isEqual = true;

    isEqual = pizza.size === item2.size;

    isEqual = pizza.dough === item2.dough;

    isEqual = pizza.pizzaEdge === item2.pizzaEdge;

    if (amountOfIngredientsEqual === amountOfIngredients && isEqual) {
      return false;
    }
    return true;
  }

  remove(item: Pizza) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const aux = cart.findIndex((i: Pizza) => !this.isDifferent(item, i));
    cart.splice(aux, 1);
    this.updateCart(cart);
  }
}
