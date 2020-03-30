'use strict'
const awsServerlessExpress = require('aws-serverless-express')

const bootstrap = require('./server/bootstrap')

// initialize app
const app = bootstrap.init(process.env)
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}