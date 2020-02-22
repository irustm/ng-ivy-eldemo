// import buildOptimizer from 'rollup-plugin-angular-optimizer';
import optimizer from '@angular-devkit/build-optimizer/src/build-optimizer/rollup-plugin';
import nodeResolve from 'rollup-plugin-node-resolve';
// import nodeResolve from '@rollup/plugin-node-resolve';
import paths from 'rollup-plugin-paths';
import pathMapping from 'rxjs/_esm5/path-mapping';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './out-tsc/app/src/app/app.component.js',
  output: {
    name: 'hw',
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    paths(pathMapping()),
    nodeResolve({jsnext: true, module: true}),
    optimizer({}),
    uglify({
      mangle: true,
      compress: {
        global_defs: {
          'ngDevMode': false,
          'ngI18nClosureMode': false,
        },
        keep_fargs: false,
        passes: 1,
        pure_getters: false,
        unsafe: false
      }
    }),
  ],
  external: []
}
