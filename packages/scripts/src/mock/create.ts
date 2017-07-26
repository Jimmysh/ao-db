import * as _ from 'lodash';

import { pouchDBImport, readDirFileSync } from '../util';

import { getAuthUrl } from './util';
import { readJsonSync } from 'fs-extra';

export function createMock(argv: any) {
  console.log('[ao-db-scripts][mock]', 'createMock');
  const files = readDirFileSync(argv.filder, '.json');

  const fdb = _.groupBy(files, (d) => {
    const end = d.lastIndexOf('/');
    const start = d.lastIndexOf('/', end - 1);
    return d.slice(start + 1, end);
  });

  let allReadFiles = {};

  _.forIn(fdb, (value: string[], key: string) => {
    const jsonArr = _
      .chain(value)
      .map(v => readJsonSync(v))
      .flattenDeep()
      .value();
    allReadFiles[key] = jsonArr;
  });
  const pall = _.map(allReadFiles, (v: any[], n: string) => {
    const url = getAuthUrl(n, argv);
    return pouchDBImport(url, ...v);
  });

  return Promise.all(pall);
}
