'use strict'
const awsServerlessExpress = require('aws-serverless-express')

const bootstrap = require('./server/bootstrap')

const binaryMimeTypes = [
  'image/*',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

// initialize app
const app = bootstrap.init(process.env)
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}
