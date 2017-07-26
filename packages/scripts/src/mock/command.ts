import * as yargs from 'yargs';

import { MockConfig } from './interface';
import { mock } from './mock';

function getConfig(): MockConfig {
  return yargs.usage('use: $0 -u [string] -h [string]')
    .option('action', {
      alias: 'a',
      describe: '用户名'
    })
    .option('serve', {
      alias: 's',
      describe: '服务器地址',
      default: 'http://127.0.0.1:5984'
    })
    .option('username', {
      alias: 'u',
      describe: '用户名'
    })
    .option('password', {
      alias: 'p',
      describe: '密码'
    })
    .option('filder', {
      alias: 'f',
      describe: 'mock path',
      demand: true
    })
    .argv;
}

export async function command(config?: MockConfig) {
  const argv = config || getConfig();
  await mock(argv);
  console.log('[ao-db-scripts][mock]', '完成');
}
