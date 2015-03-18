var shelljs = require('shelljs')
var promise = require('bluebird')
var debug = require('debug')('bplt:gitpack')

var _module = () => {

  var extractPack = (repo) => {
    repo = repo.replace(".git", "/archive/master.tar.gz")
    debug(`requesting ${repo}`)
    return new promise((resolve, reject) => {
      var cmd = `curl -fsSL ${repo} | tar xvz --strip-components 1`
      debug(cmd);
      shelljs.exec(cmd, (code, output) => {
        if (code != 0) {
          reject("Sorry, errors happened")
        } else {
          resolve("ok")
        }
      })
    })
  }

  var viewPack = (repo) => {
    repo = repo.replace(".git", "/archive/master.tar.gz")
    debug(`requesting ${repo}`)
    return new promise((resolve, reject) => {
      var cmd = `curl -fsSL ${repo}`
      debug(cmd);
      shelljs.exec(cmd, (code, output) => {
        if (code != 0) {
          reject("Sorry, errors happened")
        } else {
          resolve("ok")
        }
      })
    })
  }

  return {
    viewPack, extractPack
  }
}

module.exports = _module()
