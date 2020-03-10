import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/interfaces/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  items: Pizza[] = [];

  constructor(private cartService: CartService,
              private pizzaService: PizzaService) { }

  ngOnInit() {
    this.cartService.get().subscribe((_: Pizza[]) => this.items = _ );
    this.loadCart();
  }

  loadCart() {
    if (localStorage.getItem('cart') == null) {
      const cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      this.items = JSON.parse(localStorage.getItem('cart'));
    }
  }

  getTotalValue(orderedPizza: Pizza) {
    return this.pizzaService.totalValue(orderedPizza);
  }

  removeItem(item: Pizza) {
    this.cartService.remove(item);
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
