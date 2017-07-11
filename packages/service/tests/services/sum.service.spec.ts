import { AoDBServiceModule, SumService } from './../../src';
import { TestBed, inject } from '@angular/core/testing';

import { DBReducer } from 'ao-db-ngrx';
import { StoreModule } from '@ngrx/store';

describe('SumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AoDBServiceModule.forRoot({
          host: 'http://127.0.0.1:111',
          storeName: 'db',
          collections: []
        }),
        StoreModule.provideStore({
          db: DBReducer,
        })
      ]
    });
  });

  it('should be calculate the sum',
    inject([SumService],
      (sumService: SumService) => {
        sumService.calculate(45, 78, 90, 674);
        expect(sumService.sum).toEqual(887);
      })
  );
});
