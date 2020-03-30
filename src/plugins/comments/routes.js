const viewTest = require('./views/test')

module.exports = [
  {
    "method": "GET",
    "path": "/test",
    "handler": viewTest
  }
]

