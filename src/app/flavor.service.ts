import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from './interfaces/Flavor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlavorService {
  private url = 'api/pizzaria/flavor/';

  constructor(private http: HttpClient) { }

  flavorsList(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${this.url}`);
  }
}
