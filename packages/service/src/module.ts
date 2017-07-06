import { AoDBService, MLAB_DB_CONFIG } from './ao-db-service';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AoDBNgrxModule } from 'ao-db-ngrx';
import { IMLabDBConfig } from './interface';

@NgModule({
  imports: [
    AoDBNgrxModule.forRoot(AoDBService),
  ]
})
export class AoDBServiceModule {
  public static forRoot(config: IMLabDBConfig): ModuleWithProviders {
    return {
      ngModule: AoDBServiceModule,
      providers: [
        AoDBService,
        { provide: MLAB_DB_CONFIG, useValue: config }
      ]
    };
  }
}
