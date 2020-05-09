import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post(this.url, user).pipe(take(1));
  }

  password(userId: number, token: string, password: string) {
    return this.http.patch(this.url + '/' + userId + '/password', password).pipe(take(1));
  }

  phone(user) {
    return this.http.patch(this.url + '/' + user.id + '/phone', user.phone).pipe(take(1));
  }

  address(user) {
    return this.http.patch(this.url + '/' + user.id + '/address', user.address).pipe(take(1));
  }
}
