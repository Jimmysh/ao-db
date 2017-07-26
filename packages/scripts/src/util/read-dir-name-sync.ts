import * as _ from 'lodash';
import * as fs from 'fs';
import * as junk from 'junk';

import { extname, join } from 'path';

export function readDirNameSync(path: string) {
  let back: string[] = [];
  let fileList: string[] = fs.readdirSync(path).filter(junk.not);

  _.forEach(fileList, (item) => {
    const p = join(path, item);
    if (fs.statSync(p).isDirectory()) {
      back.push(item);
    }
  });

  return back;
}
