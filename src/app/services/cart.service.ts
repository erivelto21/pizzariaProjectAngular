import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { Pizza } from '../interfaces/pizza';
import { EditPizzaService } from './edit-pizza.service';
import { AlertService } from './alert.service';
import { PizzaService } from './pizza.service';
import { DiscountCouponKeepService } from './discount-coupon-keep.service';
import { DiscountCoupon } from '../interfaces/discount-coupon';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new Subject<Pizza[]>();
  private totalBehaviorSubject = new BehaviorSubject<number>(0);

  constructor(private editPizzaService: EditPizzaService,
              private pizzaService: PizzaService,
              private alertService: AlertService,
              private discountCouponKeepService: DiscountCouponKeepService) { }

  get(): Observable<Pizza[]> {
    if (localStorage.getItem('cart') === null) {
      this.newCart();
    } else {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.cartSubject.next(cart);
    }

    return this.cartSubject.asObservable();
  }

  getCart(): Pizza[] {
    return JSON.parse(localStorage.getItem('cart'));
  }

  newCart() {
    const cart: Pizza[] = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
    this.discountCouponKeepService.clear();
  }

  add(pizza: Pizza) {
    const cart: Pizza[] = JSON.parse(localStorage.getItem('cart'));

    const aux = cart.findIndex((i: Pizza) => pizza.customFlavor.name === i.customFlavor.name );

    if (aux === -1) {
      cart.push(pizza);
      this.updateCart(cart);
      this.alertService.addCart(true);
      return;
    }

    this.checkOccurrence(pizza, cart);
    this.updateCart(cart);
    this.alertService.addCart(true);
  }

  updateItem(pizza: Pizza) {
    const cart: Pizza[] = JSON.parse(localStorage.getItem('cart'));
    this.findCartItemForUpdate(cart, pizza);
  }

  remove(item: Pizza) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const aux = cart.findIndex((i: Pizza) => !this.isDifferent(item, i));
    cart.splice(aux, 1);
    this.updateCart(cart);
  }

  getTotal(): Observable<number> {
    const $items =  this.cartSubject.asObservable();
    const $discount = this.discountCouponKeepService.getValueObservable();

    combineLatest([$items, $discount]).subscribe(
      ([items, discountCoupon]) => {
        this.totalBehaviorSubject.next(this.calculateTotalValue(items, discountCoupon));
      }
    );

    return this.totalBehaviorSubject.asObservable();
  }

  calculateTotalValue(items: Pizza[], discountCoupon: DiscountCoupon): number {
    let total = this.calculateTotalItemsValue(items);

    if(discountCoupon === null) {
      discountCoupon = this.discountCouponKeepService.getValue();
    }

    if(discountCoupon === null) {
      return total;
    }

    const discountValue = this.calculateDiscountValue(total, discountCoupon.percentageDiscount);
    total = this.applyDiscount(total, discountValue);

    return total;
  }

  private calculateTotalItemsValue(items: Pizza[]): number {
    let total = 0;

    for (const item of items) {
      total += this.pizzaService.totalValue(item) * item.amount;
    }

    return total;
  }

  private calculateDiscountValue(total: number, discountValue: number) {
    return (total * discountValue) /100;
  }

  private applyDiscount(total: number, discountValue: number) {
    return total - discountValue;
  }

  private findCartItemForUpdate(cart: Pizza[], pizza: Pizza) {
    const orderedPizza = this.editPizzaService.getValueOrderedPizza();

    for (let i = 0; i < cart.length; i ++) {
      if (!this.isDifferent(orderedPizza, cart[i])) {

        this.updateCartItem(cart, i, pizza);

        return;
      }
    }
  }

  private updateCartItem(cart: Pizza[], position: number, pizza: Pizza) {
    cart[position] = pizza;
    cart[position].additionalsValue = this.pizzaService.calculateAdditionals(pizza);

    this.editPizzaService.clearOrderedPizza();

    this.alertService.editCartItem(true);

    this.updateCart(cart);
  }

  private updateCart(cart: Pizza[]) {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private checkOccurrence(pizza: Pizza, cart: Pizza[]) {
    for (const orderedPizza of cart) {
      if (!this.isDifferent(pizza, orderedPizza)) {
        orderedPizza.amount++;
        return;
      }
    }

    cart.push(pizza);
    this.updateCart(cart);
  }

  private isDifferent(pizza: Pizza, item2: Pizza): boolean {
    const amountOfIngredients = item2.customFlavor.ingredients.length;
    let amountOfIngredientsEqual = 0;

    for (const i of pizza.customFlavor.ingredients) {
      for (const i2 of item2.customFlavor.ingredients) {
        if (i.name === i2.name) {
          if (i.amount === i2.amount) {
            amountOfIngredientsEqual++;
          }
        }
      }
    }

    let isEqual = true;

    isEqual = pizza.size === item2.size;

    isEqual = pizza.dough === item2.dough;

    isEqual = pizza.pizzaEdge === item2.pizzaEdge;

    if (amountOfIngredientsEqual === amountOfIngredients && isEqual) {
      return false;
    }
    return true;
  }
}
