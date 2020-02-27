import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Flavor } from '../interfaces/flavor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from '../interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class FlavorService {
  private url = 'api/flavor';

  constructor(private http: HttpClient) { }

  flavorsList(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${this.url}`,
    {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')})
      .pipe(take(1));
  }

  calculateAdditionals(ingredients: Ingredient[]) {
    let total = 0;
    for (const i of ingredients) {
      total += (i.amount - 1) * 1;
    }

    return total;
  }
}
