import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  'immutable': 'immutable',
  "lodash": 'lodash',
  "lodash/index": 'lodash'
};

export default {
  entry: './build/modules/ao-db-service.es5.js',
  dest: './build/bundles/ao-db-service.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'AoDBService',
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => {
    return
  }
}
