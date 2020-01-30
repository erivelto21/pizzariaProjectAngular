import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/pizzaria/user/';

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post(this.url + 'save', user);
  }
}
