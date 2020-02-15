import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Flavor } from '../interfaces/flavor';
import { OrderedPizza } from '../interfaces/ordered-pizza';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<OrderedPizza[]>();

  constructor() { }

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

    this.checkOccurrence(item, cart);
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private checkOccurrence(item, cart: OrderedPizza[]) {
    const aux = cart.findIndex((i: OrderedPizza) => item.name === i.flavor.name );

    if (aux === -1) {
      const orderedPizza: OrderedPizza = {flavor : item, amount : 1};
      cart.push(orderedPizza);
    } else {
      cart[aux].amount++;
    }
  }

  remove(item) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const aux = cart.findIndex((i: OrderedPizza) => item.flavor.name === i.flavor.name);
    cart.splice(aux, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
}
