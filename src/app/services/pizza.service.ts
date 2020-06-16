import { Injectable } from '@angular/core';
import { Pizza } from '../interfaces/pizza';
import { Ingredient } from '../interfaces/ingredient';
import { Dough } from '../enums/dough.enum';
import { PizzaEdge } from '../enums/pizza-edge.enum';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor() { }

  totalValue(pizza: Pizza) {
    return (pizza.customFlavor.price + this.calculatePrizePerSize(pizza)) + this.calculateAdditionals(pizza);
  }

  calculateAdditionals(pizza: Pizza) {
    let total = 0;

    total += this.calculateAdditionalsOfIngredients(pizza.customFlavor.ingredients);
    total += this.calculateAdditionalsOfDough(pizza.dough);
    total += this.calculateAdditionalsOfPizzaEdge(pizza.pizzaEdge);

    return total;
  }

  private calculateAdditionalsOfDough(dough: Dough) {
    return dough === 'Tradicional' ? 0 : 1;
  }

  private calculatePrizePerSize(pizza: Pizza) {
    if (pizza.size === 'Pequena') {
      return - 2;
    }
    if (pizza.size === 'Grande') {
      return 2;
    }
    if (pizza.size === 'Extra Grande') {
      return 4;
    }

    return 0;
  }

  private calculateAdditionalsOfPizzaEdge(pizzaEdge: PizzaEdge) {
    return pizzaEdge === 'Sem recheio' ? 0 : 1;
  }

  private calculateAdditionalsOfIngredients(ingredients: Ingredient[]) {
    let total = 0;
    for (const i of ingredients) {
      if(i.amount > 0)
        total += (i.amount - 1) * 1;
    }

    return total;
  }
}
