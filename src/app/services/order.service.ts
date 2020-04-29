import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'api/order';

  constructor(private http: HttpClient) { }

  getByUser() {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));

    return this.http.get<Order[]>(this.url + '/user/' + account.systemUser.id,
    {headers: new HttpHeaders()
      .set('Authorization', 'Bearer ' + account.systemUser.token)
      .set('Content-Type', 'application/json')});
  }
}
