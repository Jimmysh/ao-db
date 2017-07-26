import * as _ from 'lodash';
import * as fs from 'fs';
import * as junk from 'junk';

import { extname, join } from 'path';

export function readDirFileSync(path: string, ...extnames: string[]) {
  let back: string[] = [];
  let fileList: string[] = fs.readdirSync(path).filter(junk.not);

  _.forEach(fileList, (item) => {
    const p = join(path, item);
    if (fs.statSync(p).isDirectory()) {
      const files = readDirFileSync(p);
      back = [...back, ...files];
    } else {
      back.push(p);
    }
  });

  if (extnames.length > 0) {
    extnames = extnames.map(d => d.toLowerCase());
    back = _.filter(back, f => extnames.indexOf(extname(f).toLowerCase()) !== -1);
  }
  return back;
}
