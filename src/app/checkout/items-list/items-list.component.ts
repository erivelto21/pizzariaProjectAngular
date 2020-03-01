import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Pizza } from 'src/app/interfaces/pizza';
import { Router } from '@angular/router';
import { EditPizzaService } from 'src/app/services/edit-pizza.service';
import { CustomFlavorService } from 'src/app/services/custom-flavor.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: Pizza[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private editPizzaService: EditPizzaService,
    private customFlavorService: CustomFlavorService) { }

  ngOnInit() {
    this.cartService.get().subscribe((_: Pizza[]) => this.items = _ );
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

  totalEachItem(orderedPizza: Pizza) {
    return this.customFlavorService.totalValue(orderedPizza.customFlavor) * orderedPizza.amount;
  }

  amoutTotal() {
    let total = 0;

    for (const item of this.items) {
      total += this.customFlavorService.totalValue(item.customFlavor) * item.amount;
    }

    return total;
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
