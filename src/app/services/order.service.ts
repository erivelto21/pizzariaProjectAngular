import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { Account } from '../interfaces/account';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiUrl + '/order';

  constructor(private http: HttpClient) { }

  getByUser() {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));

    return this.http.get<Order[]>(this.url + '/user/' + account.systemUser.id).pipe(take(1));;
  }
}
