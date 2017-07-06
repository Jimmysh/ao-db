import * as security from 'pouchdb-security';

import { AoDB, IAoDBOptions, PouchDB } from 'ao-db-core';

import { DesignPlugin } from './design-plugin';
import { IAoDBNodeOptions } from './interface';
import { IndexPlugin } from './index-plugin';
import { Observable } from 'rxjs/Observable';
import { SecurityPlugin } from './security-plugin';

PouchDB
  .plugin(security);

export class AoDBNode extends AoDB {

  design: DesignPlugin;
  index: IndexPlugin;
  security: SecurityPlugin;

  constructor(settings: IAoDBNodeOptions) {
    super(settings);
    this.design = new DesignPlugin(this);
    this.index = new IndexPlugin(this);
    // 等待 官方 fix
    // this.security = new SecurityPlugin(this)
  }
}
