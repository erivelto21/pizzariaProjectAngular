import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Flavor } from '../interfaces/flavor';
import { OrderedPizza } from '../interfaces/ordered-pizza';
import { EditPizzaService } from './edit-pizza.service';
import { FlavorService } from './flavor.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<OrderedPizza[]>();

  constructor(private editPizzaService: EditPizzaService,
              private flavorService: FlavorService) { }

  get(): Observable<OrderedPizza[]> {
    if (localStorage.getItem('cart') == null) {
      this.newCart();
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.cartSubject.next(cart);
    }

    return this.cartSubject.asObservable();
  }

  newCart() {
    const cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  add(item: Flavor) {
    const cart: OrderedPizza[] = JSON.parse(localStorage.getItem('cart'));

    if (this.editPizzaService.getValueOrderedPizza() !== null) {
      this.updateCartItem(cart, item);
      return;
    }

    this.checkOccurrence(item, cart);
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private updateCartItem(cart: OrderedPizza[], flavor: Flavor) {
    const orderedPizza = this.editPizzaService.getValueOrderedPizza();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cart.length; i ++) {
      if (!this.isDifferent(orderedPizza.customFlavor.flavor, cart[i])) {
        cart[i].customFlavor.flavor = flavor;
        cart[i].customFlavor.additionalsValue = this.flavorService.calculateAdditionals(flavor);
        this.editPizzaService.clearOrderedPizza();
        this.cartSubject.next(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        return;
      }
    }
  }

  private checkOccurrence(item, cart: OrderedPizza[]) {
    const aux = cart.findIndex((i: OrderedPizza) => item.name === i.customFlavor.flavor.name );

    if (aux === -1) {
      const orderedPizza: OrderedPizza = {customFlavor :
        {flavor: item, additionalsValue: this.flavorService.calculateAdditionals(item)},
         amount : 1};
      cart.push(orderedPizza);
      return;
    }

    let occurrenceIsFound = false;

    for (const orderedPizza of cart) {
      if (!this.isDifferent(item, orderedPizza)) {
        orderedPizza.amount++;
        occurrenceIsFound = true;
      }
    }

    if (!occurrenceIsFound) {
      const orderedPizza: OrderedPizza = {customFlavor :
        {flavor: item, additionalsValue: this.flavorService.calculateAdditionals(item)},
         amount : 1};
      cart.push(orderedPizza);
    }
  }

  private isDifferent(item: Flavor, item2: OrderedPizza): boolean {
    const amountOfIngredients = item2.customFlavor.flavor.ingredients.length;
    let amountOfIngredientsEqual = 0;

    for (const i of item.ingredients) {
      for (const i2 of item2.customFlavor.flavor.ingredients) {
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

  remove(item: OrderedPizza) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const aux = cart.findIndex((i: OrderedPizza) => !this.isDifferent(item.customFlavor.flavor, i));
    cart.splice(aux, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
}
