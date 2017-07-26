import { PouchDBDestroy, readDirNameSync } from '../util';

import { getAuthUrl } from './util';

export async function removeMock(argv: any) {
  let names = readDirNameSync(argv.filder);
  names = names.map(n => getAuthUrl(n, argv));

  console.log('removeMock', names);

  return PouchDBDestroy(...names);
}
