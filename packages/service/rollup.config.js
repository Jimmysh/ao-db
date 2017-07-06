import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/add/operator/map': 'Rx'
};

export default {
  entry: './build/modules/ao-db-service.es5.js',
  dest: './build/bundles/ao-db-service.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ng.ao.db.ngrx',
  plugins: [resolve()],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => {
    return
  }
}
