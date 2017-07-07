import { AO_DB_SERVICE_CONFIG, AoDBService } from './ao-db-service';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AoDBNgrxModule } from 'ao-db-ngrx';
import { IAoDBServiceConfig } from './interface';

@NgModule({
  imports: [
    AoDBNgrxModule.forRoot(AoDBService),
  ]
})
export class AoDBServiceModule {
  public static forRoot(config: IAoDBServiceConfig): ModuleWithProviders {
    return {
      ngModule: AoDBServiceModule,
      providers: [
        AoDBService,
        { provide: AO_DB_SERVICE_CONFIG, useValue: config }
      ]
    };
  }
}
