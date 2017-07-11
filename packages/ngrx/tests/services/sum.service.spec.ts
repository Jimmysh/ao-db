import { AoDBNgrxModule, DBTaskActions } from './../../index';
import { TestBed, inject } from '@angular/core/testing';

describe('SumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AoDBNgrxModule.forRoot({})
      ]
    });
  });

  it('should be calculate the sum',
    inject([DBTaskActions],
      (d: DBTaskActions) => {
        console.log('----------d', d);
      })
  );

});
