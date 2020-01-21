import { Component, OnInit, Input } from '@angular/core';
import { Flavor } from '../interfaces/Flavor';
import { Ingredient } from '../interfaces/Ingredient';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() flavor: Flavor;
  public ingredients: string;

  constructor() { }

  ngOnInit() {
    this.getingredients();
  }

  private getingredients() {
    this.ingredients = '';
    this.putCommaAndDot(this.flavor.ingredients);
    this.flavor.ingredients.forEach( (ingredient: Ingredient) => this.ingredients += ingredient.name);
  }

  private putCommaAndDot(ingredients: Ingredient[]) {
    const pointIndex = ingredients.length - 1;

    for (let i = 0; i < ingredients.length; i++) {
      if (i === pointIndex) {
        ingredients[i].name += '.';
      } else {
        ingredients[i].name += ', ';
      }
    }

  }
}
