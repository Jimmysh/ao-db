import * as _ from 'lodash';
import * as superagent from 'superagent';

import { test } from 'ava';

export function PouchDBDestroy(...dbNames: string[]): Promise<any> {
  const pall = dbNames.map(name =>
    superagent.delete(name));
  return Promise.all(pall);
}
