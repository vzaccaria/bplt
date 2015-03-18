/* from: https://github.com/sindresorhus/node-module-boilerplate.git
   to: curl -fsSL https://github.com/sindresorhus/node-module-boilerplate/archive/master.tar.gz | tar -xz --strip-components 2
*/


var shelljs = require('shelljs')
var { docopt } = require('docopt')
var _ = require('lodash')
var fs = require('fs')

var getOption = (a, b, def, o) => {
  if(_.isString(o[a])) {
    return o[a]
  } else {
    if(_.isString(o[b])) {
        return o[b]
    } else {
      return def
    }
  }
}


var getOptions = doc => {
  var o = docopt(doc)
  var name = getOption('-n', '--name', "", o)
  var repo = o['REPO']
  var config = getOption('-c', '--config', "", o)
  var checkout = o['co'] || o['checkout']
  var list = o['ls'] || o['list']
  return {
    repo, config, checkout,list, name
  }
}

var doc = fs.readFileSync(__dirname+"/docs/usage.md", 'utf8')

var main = () => {
  console.log(getOptions(doc))
}

main()
