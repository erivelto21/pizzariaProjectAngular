import { Injectable } from '@angular/core';
import { Flavor } from '../interfaces/flavor';
import { BehaviorSubject } from 'rxjs';
import { OrderedPizza } from '../interfaces/ordered-pizza';

@Injectable({
  providedIn: 'root'
})
export class EditPizzaService {

  private cartOrderedPizza = new BehaviorSubject <OrderedPizza>(null);
  private cartFlavor = new BehaviorSubject <Flavor>(null);

  constructor() { }

  getValueFlavor() {
    return this.cartFlavor.getValue();
  }

  setFlavor(flavor: Flavor) {
    this.cartFlavor.next(flavor);
  }

  clearFlavor() {
    this.cartFlavor.next(null);
  }

  getValueOrderedPizza() {
    return this.cartOrderedPizza.getValue();
  }

  setOrderedPizza(orderedPizza: OrderedPizza) {
    this.cartOrderedPizza.next(orderedPizza);
  }

  clearOrderedPizza() {
    this.cartOrderedPizza.next(null);
  }

  clearAll() {
    this.cartFlavor.next(null);
    this.cartOrderedPizza.next(null);
  }
}
