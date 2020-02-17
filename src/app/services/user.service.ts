import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/pizzaria/user';

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post(this.url, user).pipe(take(1));
  }

  address(user) {
    return this.http.put(this.url, user, { headers: new HttpHeaders().set('Authorization', user.token), }).pipe(take(1));
  }
}