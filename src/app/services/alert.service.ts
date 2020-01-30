import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new BehaviorSubject<Message>(null);
  private keepAfterRouteChange = false;
  private message: Message;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
                this.keepAfterRouteChange = false;
            } else {
                this.clear();
            }
        }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.message = { type: 'success', text: message, cssClass: 'alert alert-success'};
    this.subject.next(this.message);
  }

  addCart() {
    this.message = { type: 'add-cart', text: 'Adicionado ao carrinho', cssClass: 'alert alert-add-cart'};
    this.subject.next(this.message);
  }

  error(message: string, keepAfterRouteChange) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.message = { type: 'error', text: message, cssClass: 'alert alert-danger'};
    this.subject.next(this.message);
  }

  clear() {
      this.subject.next(null);
  }
}
