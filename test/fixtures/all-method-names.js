var camelize = require('camelize')
var fs = require('fs')
var path = require('path')

var jsFile = /^(.*)[.]js$/
var ignoreFiles = /^(index|chain)[.]js$/

module.exports = fs.readdirSync(path.resolve(__dirname, '../..'))
  .filter(function (filename) {
    return jsFile.test(filename) && !ignoreFiles.test(filename)
  })
  .map(function (filename) {
    return jsFile.exec(filename)[1]
  })
  .map(camelize)
