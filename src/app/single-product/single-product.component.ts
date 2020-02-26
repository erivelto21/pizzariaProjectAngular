import { Component, OnInit, Input } from '@angular/core';
import { Flavor } from '../interfaces/flavor';
import { Ingredient } from '../interfaces/ingredient';
import { Router } from '@angular/router';
import { EditPizzaService } from '../services/edit-pizza.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() flavor: Flavor;
  public ingredients: string;

  constructor(private router: Router, private editPizzaService: EditPizzaService) { }

  ngOnInit() {
    this.getingredients();
  }

  private getingredients() {
    this.ingredients = '';
    this.putCommaAndDot(this.flavor.ingredients);
  }

  private putCommaAndDot(ingredients: Ingredient[]) {
    const pointIndex = ingredients.length - 1;

    for (let i = 0; i < ingredients.length; i++) {
      if (i === pointIndex) {
        this.ingredients += ingredients[i].name + '.';
      } else {
        this.ingredients += ingredients[i].name + ', ';
      }
    }
  }

  buy() {
    this.editPizzaService.setFlavor(this.flavor);
    this.router.navigate(['/edit']);
  }
}
