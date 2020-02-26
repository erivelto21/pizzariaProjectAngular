import { Injectable } from '@angular/core';
import { Flavor } from '../interfaces/flavor';
import { BehaviorSubject } from 'rxjs';
import { OrderedPizza } from '../interfaces/ordered-pizza';

@Injectable({
  providedIn: 'root'
})
export class EditPizzaService {

  private cartSubjectOrderedPizza = new BehaviorSubject <OrderedPizza>(null);
  private cartSubjectFlavor = new BehaviorSubject <Flavor>(null);

  constructor() { }

  getValueFlavor() {
    return this.cartSubjectFlavor.getValue();
  }

  setFlavor(flavor: Flavor) {
    this.cartSubjectFlavor.next(flavor);
  }

  clearFlavor() {
    this.cartSubjectFlavor.next(null);
  }

  getValueOrderedPizza() {
    return this.cartSubjectOrderedPizza.getValue();
  }

  setOrderedPizza(orderedPizza: OrderedPizza) {
    this.cartSubjectOrderedPizza.next(orderedPizza);
  }

  clearOrderedPizza() {
    this.cartSubjectOrderedPizza.next(null);
  }
}
