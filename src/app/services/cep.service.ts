import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  get(cep) {
    return this.http.get('https://viacep.com.br/ws/' + cep + '/json/').pipe(take(1));
  }
}
