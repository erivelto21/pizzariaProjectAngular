import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertService } from '../services/alert.service';
import { EditPizzaService } from '../services/edit-pizza.service';
import { Ingredient } from '../interfaces/ingredient';
import { Router } from '@angular/router';
import { FlavorService } from '../services/flavor.service';
import { Flavor } from '../interfaces/flavor';
import { CustomFlavor } from '../classes/custom-flavor';
import { CustomIngredient } from '../classes/custom-ingredient';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  customFlavor: CustomFlavor;
  show = false;

  constructor(private editPizzaService: EditPizzaService,
              private cartService: CartService,
              private alertService: AlertService,
              private flavorService: FlavorService,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.editPizzaService.getValueFlavor() !== null) {
      this.customFlavor = this.customerFlavorBuild(this.editPizzaService.getValueFlavor());
      this.editPizzaService.clearFlavor();
    } else if (this.editPizzaService.getValueOrderedPizza !== null) {
      this.customFlavor = JSON.parse(JSON.stringify(this.editPizzaService.getValueOrderedPizza().customFlavor));
    }
  }

  Additionals() {
    return this.flavorService.calculateAdditionals(this.customFlavor.ingredients);
  }

  checked(ingredient: Ingredient, value: number) {
    return ingredient.amount === value;
  }

  x1(ingredient: Ingredient) {
    ingredient.amount = 1;
  }

  x2(ingredient: Ingredient) {
    ingredient.amount = 2;
  }

  x3(ingredient: Ingredient) {
    ingredient.amount = 3;
  }

  addCart() {
    this.customFlavor.additionalsValue = this.flavorService.calculateAdditionals(this.customFlavor.ingredients);

    this.cartService.add(this.customFlavor);
    this.alertService.addCart(true);

    this.router.navigate(['/home']);

    setTimeout(() => {
      this.alertService.clear();
    }, 1000);
  }

  private customerFlavorBuild(flavor: Flavor): CustomFlavor {
    const customFlavor: CustomFlavor = new CustomFlavor();

    customFlavor.id = 0;
    customFlavor.image = flavor.image;
    customFlavor.ingredients = this.ingredientsBuild(flavor.ingredients);
    customFlavor.name = flavor.name;
    customFlavor.price = flavor.price;
    customFlavor.type = flavor.type;
    customFlavor.additionalsValue = this.flavorService.calculateAdditionals(flavor.ingredients);

    return customFlavor;
  }

  private ingredientsBuild(ingredients: CustomIngredient[]) {
    const ingredients1: CustomIngredient[] = [];

    for (const i of ingredients) {
      ingredients1.push(this.customIngredientBuild(i));
    }

    return ingredients1;
  }

  private customIngredientBuild(ingredient: CustomIngredient): CustomIngredient {
    ingredient.id = 0;

    return ingredient;
  }
}
