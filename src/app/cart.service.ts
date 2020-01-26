import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Flavor } from './interfaces/Flavor';
import { OrderedPizza } from './interfaces/Ordered-pizza';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<OrderedPizza[]>();

  constructor() { }

  get(): Observable<OrderedPizza[]> {
    if (localStorage.getItem('cart') == null) {
      const cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.cartSubject.next(cart);
    }

    return this.cartSubject.asObservable();
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
      const orderedPizza: OrderedPizza = {flavor : item, quantidade : 1};
      cart.push(orderedPizza);
    } else {
      cart[aux].quantidade++;
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
