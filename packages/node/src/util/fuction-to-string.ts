const Babel = require('babel-standalone');

import { minify } from 'uglify-js';

export function functionToString(fn: Function): string {
  let code = Babel
    .transform(fn.toString(), { presets: ['es2015'] })
    .code
    .replace(/[\'|\"]use strict[\'|\"];(\n\n)?/g, '')
    .replace(/^\(/g, '')
    .replace(/\);$/g, ';');

  const result = minify(`var a=${code}`)
    .code
    .replace(/^var a=/g, '');
  return result;
}
