import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Flavor } from '../interfaces/flavor';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlavorService {
  private url = environment.apiUrl + '/flavor';

  constructor(private http: HttpClient) { }

  flavorsList(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${this.url}`)
      .pipe(take(1));
  }
}
