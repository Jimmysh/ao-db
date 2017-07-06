import * as design from './design';

import { AoDBNode } from 'ao-db-node';
import { IAoDBOptions } from 'ao-db-core';
import { host } from './global';

const conf: IAoDBOptions = {
  host,
  collections: [
    design.basic
  ]
};

const DB = new AoDBNode(conf);
export {
  DB,
  design
};
