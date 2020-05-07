import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/interfaces/pizza';
import { Router } from '@angular/router';
import { EditPizzaService } from 'src/app/services/edit-pizza.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: Pizza[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private editPizzaService: EditPizzaService,
    private pizzaService: PizzaService) { }

  ngOnInit() {
    this.cartService.getTotal().subscribe((total) => this.total = total);
    this.cartService.get().subscribe((_: Pizza[]) => this.items = _ );
    this.items = this.cartService.getCart();
  }

  totalItems() {
    let total = 0;

    for (const item of this.items) {
      total += item.amount;
    }

    return total;
  }

  totalEachItem(orderedPizza: Pizza) {
    return this.pizzaService.totalValue(orderedPizza) * orderedPizza.amount;
  }

  goEdit(orderedPizza: Pizza) {
    this.editPizzaService.setOrderedPizza(orderedPizza);
    this.router.navigate(['/edit']);
  }

  removeItem(item: Pizza) {
    this.cartService.remove(item);
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
