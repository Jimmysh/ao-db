import { AO_DB_SERVICE_CONFIG, AoDBHelper } from './ao-db-helper';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AoDBNgrxModule } from 'ao-db-ngrx';
import { IAoDBServiceConfig } from './interface';
import { SumService } from './sum.service';

@NgModule({
  imports: [
    AoDBNgrxModule.forRoot(AoDBHelper),
  ]
})
export class AoDBServiceModule {
  public static forRoot(config: IAoDBServiceConfig): ModuleWithProviders {
    return {
      ngModule: AoDBServiceModule,
      providers: [
        AoDBHelper,
        SumService,
        { provide: AO_DB_SERVICE_CONFIG, useValue: config }
      ]
    };
  }
}
