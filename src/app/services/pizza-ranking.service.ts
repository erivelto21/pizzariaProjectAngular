import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaRankingService {
  private url = environment.apiUrl + '/pizza';

  constructor(private http: HttpClient) { }

  getRanking() {
    return this.http.get(this.url).pipe(take(1));
  }
}
