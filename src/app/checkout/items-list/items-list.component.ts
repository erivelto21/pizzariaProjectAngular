import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: OrderedPizza[] = [];

  constructor(private cartService: CartService) { }

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
      total += item.quantidade;
    }

    return total;
  }

  amoutTotal() {
    let total = 0;

    for (const item of this.items) {
      total += (item.flavor.price * item.quantidade);
    }

    return total;
  }

  removeItem(item: OrderedPizza) {
    this.cartService.remove(item);
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
