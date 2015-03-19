var shelljs = require('shelljs')
var promise = require('bluebird')
var path    = require('path')
var debug   = require('debug')('bplt:gitpack')
var _       = require('lodash')

var _module = () => {

  var extractLocal = (repo) => {
    return new promise((resolve, reject) => {
      var srcdir = path.resolve(repo)
      var dstdir = process.cwd()
      var cmd = `cd ${srcdir} ; tar -cf - . | (cd ${dstdir} ; tar -xpf -)`
      debug(cmd);
      shelljs.exec(cmd, (code, output) => {
        if (code !== 0) {
          reject("Sorry, errors happened")
        } else {
          resolve("ok")
        }
      })
    })
  }

  var _extractPack = (repo) => {
    repo = repo.replace(".git", "/archive/master.tar.gz")
    debug(`requesting ${repo}`)
    return new promise((resolve, reject) => {
      var cmd = `curl -fsSL ${repo} | tar xvz --strip-components 1`
      debug(cmd);
      shelljs.exec(cmd, (code, output) => {
        if (code !== 0) {
          reject("Sorry, errors happened")
        } else {
          resolve("ok")
        }
      })
    })
  }

  var extractPack = (repo) => {
    if(!_.startsWith(repo, "https")) {
      return extractLocal(repo)
    } else {
      return _extractPack(repo)
    }
  }

  var viewPack = (repo) => {
    repo = repo.replace(".git", "/archive/master.tar.gz")
    debug(`requesting ${repo}`)
    return new promise((resolve, reject) => {
      var cmd = `curl -fsSL ${repo}`
      debug(cmd);
      shelljs.exec(cmd, (code, output) => {
        if (code !== 0) {
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
