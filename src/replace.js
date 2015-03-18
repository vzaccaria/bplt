//
// #!/bin/sh
// #
// # Find and replace by a given list of files.
// #
// # replace foo bar **/*.rb
//
// find_this=$1
// shift
// replace_with=$1
// shift
//
// ag -l --nocolor $find_this $* | xargs sed -i '' "s/$find_this/$replace_with/g"

var shelljs = require('shelljs')
var promise = require('bluebird')
var debug = require('debug')('bplt:replace')

var _module = () => {

  var replace = (x, y) => {
    return new promise( (resolve, reject) => {
      var cmd = `ack -l --nocolor '${x}' . | xargs sed -i '' "s/${x}/${y}/g"`
      debug(cmd)
      shelljs.exec(cmd, (code, output) => {
        resolve('done')
      })
    })
  }

  return {
    replace
  }
}

module.exports = _module()
