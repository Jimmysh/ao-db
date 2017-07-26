import 'ava';

import * as _ from 'lodash';

import { MockActionType, mock, run } from 'ao-db-scripts';

import { join } from 'path';
import { test } from 'ava';

const conf = {
  serve: 'http://0.0.0.0:11111',
  filder: join(process.cwd(), './src/_spec/dbs')
};

test.serial('createMock', async t => {
  const config = _.assign({ action: MockActionType.Import }, conf);
  const m = await mock(config);
  t.pass();
});

test.serial('removeMock', async t => {
  const config = _.assign({ action: MockActionType.Remove }, conf);
  const m = await run('mock', config);
  t.pass();
});
