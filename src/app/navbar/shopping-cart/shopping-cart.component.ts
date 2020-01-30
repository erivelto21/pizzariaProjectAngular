import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: OrderedPizza[] = [];

  constructor(private cartService: CartService) { }

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

  removeItem(item: OrderedPizza) {
    this.cartService.remove(item);
  }
}
