import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';
import { Router } from '@angular/router';
import { EditPizzaService } from 'src/app/services/edit-pizza.service';
import { Flavor } from 'src/app/interfaces/flavor';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: OrderedPizza[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private editPizzaService: EditPizzaService) { }

  ngOnInit() {
    this.cartService.get().subscribe((_: OrderedPizza[]) => this.items = _ );
    this.loadCart();
  }

  loadCart() {
    this.items = JSON.parse(localStorage.getItem('cart'));
  }

  totalItems() {
    let total = 0;

    for (const item of this.items) {
      total += item.amount;
    }

    return total;
  }

  amoutTotal() {
    let total = 0;

    for (const item of this.items) {
      total += (item.customFlavor.flavor.price * item.amount) + item.customFlavor.additionalsValue;
    }

    return total;
  }

  goEdit(orderedPizza: OrderedPizza) {
    this.editPizzaService.setOrderedPizza(orderedPizza);
    this.router.navigate(['/edit']);
  }

  total(orderedPizza: OrderedPizza) {
    return (orderedPizza.customFlavor.flavor.price * orderedPizza.amount) + orderedPizza.customFlavor.additionalsValue;
  }

  removeItem(item: OrderedPizza) {
    this.cartService.remove(item);
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
