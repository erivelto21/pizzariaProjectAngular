import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertService } from '../services/alert.service';
import { EditPizzaService } from '../services/edit-pizza.service';
import { Ingredient } from '../interfaces/ingredient';
import { Router } from '@angular/router';
import { FlavorService } from '../services/flavor.service';
import { Flavor } from '../interfaces/flavor';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  flavor: Flavor;
  show = false;

  constructor(private editPizzaService: EditPizzaService,
              private cartService: CartService,
              private alertService: AlertService,
              private flavorService: FlavorService,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.editPizzaService.getValueFlavor() !== null) {
      this.flavor = this.editPizzaService.getValueFlavor();
      this.flavor.id = 0;
      this.editPizzaService.clearFlavor();
    } else if (this.editPizzaService.getValueOrderedPizza !== null) {
      this.flavor = JSON.parse(JSON.stringify(this.editPizzaService.getValueOrderedPizza().customFlavor.flavor));
    }
  }

  Additionals() {
    return this.flavorService.calculateAdditionals(this.flavor);
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
    this.cartService.add(this.flavor);
    this.alertService.addCart(true);

    this.router.navigate(['/home']);

    setTimeout(() => {
      this.alertService.clear();
    }, 1000);
  }
}
