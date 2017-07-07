import { IAoDBOptions } from 'ao-db-core';

export interface IAoDBServiceConfig extends IAoDBOptions {
  storeName: string;
}
