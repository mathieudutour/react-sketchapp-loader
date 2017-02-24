var babel = require('rollup-plugin-babel')
var cleanup = require('rollup-plugin-cleanup')
var replace = require('rollup-plugin-replace')
var commonjs = require('rollup-plugin-commonjs')
var nodeResolve = require('rollup-plugin-node-resolve')
var json = require('rollup-plugin-json')

export default {
  format: 'iife',
  moduleName: 'code',
  useStrict: false,
  globals: {
    react: 'React',
    'react-sketchapp': 'ReactSketchApp'
  },
  plugins: [
    json(),
    nodeResolve({
      module: false,
      browser: true,
      extensions: [ '.js', '.json' ],
      preferBuiltins: false,
      skip: ['react', 'react-sketchapp']
    }),
    commonjs({
      ignoreGlobal: false
    }),
    babel({
      exclude: ['node_modules/**', '*.json']
    }),
    cleanup({ sourceType: 'module' }),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ]
}
