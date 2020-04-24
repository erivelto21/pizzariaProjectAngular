import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertService } from '../services/alert.service';
import { EditPizzaService } from '../services/edit-pizza.service';
import { Ingredient } from '../interfaces/ingredient';
import { Router } from '@angular/router';
import { Flavor } from '../interfaces/flavor';
import { CustomFlavor } from '../classes/custom-flavor';
import { CustomIngredient } from '../classes/custom-ingredient';
import { Pizza } from '../interfaces/pizza';
import { Dough } from '../enums/dough.enum';
import { Size } from '../enums/size.enum';
import { PizzaEdge } from '../enums/pizza-edge.enum';
import { PizzaService } from '../services/pizza.service';
import { FlavorService } from '../services/flavor.service';
import { AccountService } from '../services/account.service';
import { Account } from '../interfaces/account';

@Component({
  selector: 'app-edit-pizza',
  templateUrl: './edit-pizza.component.html',
  styleUrls: ['./edit-pizza.component.css']
})
export class EditPizzaComponent implements OnInit {
  show = false;
  favorite = false;
  pizza: Pizza;
  sizes: string[] = [];
  doughs: string[] = [];
  pizzaEdges: string[] = [];

  constructor(private editPizzaService: EditPizzaService,
              private cartService: CartService,
              private alertService: AlertService,
              private pizzaService: PizzaService,
              private flavorService: FlavorService,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    if (this.editPizzaService.getValueFlavor() !== null) {
      this.pizzaBuild();
      this.editPizzaService.clearFlavor();
    } else if (this.editPizzaService.getValueOrderedPizza !== null) {
      this.pizza = JSON.parse(JSON.stringify(this.editPizzaService.getValueOrderedPizza()));
    }

    this.sizes = Object.values(Size);
    this.doughs = Object.values(Dough);
    this.pizzaEdges = Object.values(PizzaEdge);

    this.isFavorite();
  }

  Additionals() {
    return this.pizzaService.calculateAdditionals(this.pizza);
  }

  total() {
    return this.pizzaService.totalValue(this.pizza);
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
    this.pizza.additionalsValue = this.pizzaService.calculateAdditionals(this.pizza);

    if (this.editPizzaService.getValueOrderedPizza() !== null) {
      this.cartService.updateItem(this.pizza);
    } else {
      this.cartService.add(this.pizza);
    }

    this.router.navigate(['/home']);

    setTimeout(() => {
      this.alertService.clear();
    }, 1000);
  }

  isSelectedSize(value) {
    return value === this.pizza.size;
  }

  isSelectedDough(value) {
    return value === this.pizza.dough;
  }

  isSelectedPizzaEdge(value) {
    return value === this.pizza.pizzaEdge;
  }

  favoriteModify() {
    this.flavorService.flavorsList().subscribe(
      (list) => {
        const flavorId: number = list.find( flavor => flavor.name === this.pizza.customFlavor.name ).id;

        if (!this.favorite) {
          this.newFavorite(flavorId);
        } else {
          this.removeFavorit(flavorId);
        }
      }
    );
  }

  getCurrentAccount() {
    return JSON.parse(localStorage.getItem('currentAccount'));
  }

  private newFavorite(flavorId: number) {
    this.accountService.addFavorite(flavorId).subscribe((account) => {
      this.updateFavoriteList(account.favorites);
    });
  }

  private removeFavorit(flavorId: number) {
    this.accountService.removeFavorite(flavorId).subscribe((account) => {
      this.updateFavoriteList(account.favorites);
    });
  }

  private updateFavoriteList(favorites: Flavor[]) {
    this.accountService.updateFavorites(favorites);
    this.isFavorite();
  }

  private isFavorite() {
    if (this.getCurrentAccount() === null) {
      return;
    }

    const currentAccount: Account = this.getCurrentAccount();

    const flavor: Flavor = currentAccount.favorites.find(f => f.name === this.pizza.customFlavor.name);

    if (flavor === undefined) {
      this.favorite = false;
    } else {
      this.favorite = true;
    }
  }

  private pizzaBuild() {
    this.pizza = {id: 0, customFlavor: this.customerFlavorBuild(this.editPizzaService.getValueFlavor()),
      additionalsValue : 0,
      dough: Dough.TRADICIONAL, size: Size.MEDIA,
      pizzaEdge: PizzaEdge.SEMRECHEIO, amount: 1};
  }

  private customerFlavorBuild(flavor: Flavor): CustomFlavor {
    const customFlavor: CustomFlavor = new CustomFlavor();

    customFlavor.id = 0;
    customFlavor.image = flavor.image;
    customFlavor.ingredients = this.ingredientsBuild(flavor.ingredients);
    customFlavor.name = flavor.name;
    customFlavor.price = flavor.price;
    customFlavor.type = flavor.type;

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
