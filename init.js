var path = require('path')
var argv = require('yargs')
  .default('test', false)
  .default('environment', 'production')
  .argv
if (argv.environment == 'development') {
  console.log('In development mode')
}
require('electron-compile').init(__dirname, './app/app')
require('./app/app')
