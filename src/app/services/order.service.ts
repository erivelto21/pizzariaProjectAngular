import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'api/order';

  constructor(private http: HttpClient) { }

  getByUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<Order[]>(this.url + '/user/' + user.id,
    {headers: new HttpHeaders()
      .set('Authorization', user.token)
      .set('Content-Type', 'application/json')});
  }
}
