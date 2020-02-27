import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';
import { CustomFlavorService } from 'src/app/services/custom-flavor.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  items: OrderedPizza[] = [];

  constructor(private cartService: CartService,
              private customFlavorService: CustomFlavorService) { }

  ngOnInit() {
    this.cartService.get().subscribe((_: OrderedPizza[]) => this.items = _ );
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

  getTotalValue(orderedPizza: OrderedPizza) {
    return this.customFlavorService.totalValue(orderedPizza.customFlavor);
  }

  removeItem(item: OrderedPizza) {
    this.cartService.remove(item);
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
