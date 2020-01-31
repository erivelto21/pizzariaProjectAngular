import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/pizzaria/user/';

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post(this.url, user).pipe(take(1));
  }
}
