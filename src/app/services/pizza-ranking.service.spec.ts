import { TestBed } from '@angular/core/testing';

import { PizzaRankingService } from './pizza-ranking.service';

describe('PizzaRankingService', () => {
  let service: PizzaRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
