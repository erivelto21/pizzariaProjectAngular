import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'api/pizzaria/order';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getByUser() {
    const user = this.authenticationService.getCurrentUserValue();

    return this.http.get<Order[]>(this.url + '/user/' + user.id,
    {headers: new HttpHeaders()
      .set('Authorization', user.token)
      .set('Content-Type', 'application/json')});
  }
}
