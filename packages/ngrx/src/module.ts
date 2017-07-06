import { ModuleWithProviders, NgModule } from '@angular/core';

import { DBActions } from './db-actions';
import { DBEffects } from './db-effects';
import { DBResultActions } from './db-result-actions';
import { DBTaskActions } from './db-task-actions';
import { Database } from './database';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule,
    EffectsModule.run(DBEffects),
  ]
})
export class RxAoDBModule {
  public static forRoot(db: any): ModuleWithProviders {
    return {
      ngModule: RxAoDBModule,
      providers: [
        { provide: Database, useExisting: db },
        DBEffects,
        DBActions,
        DBTaskActions,
        DBResultActions,
      ]
    };
  }
}
