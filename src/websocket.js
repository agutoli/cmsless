const DynamoDB = require('aws-sdk/clients/dynamodb');
const ApiGatewayManagementApi = require('aws-sdk/clients/apigatewaymanagementapi');

const apig = new ApiGatewayManagementApi({
  endpoint: process.env.APIG_ENDPOINT
});

const dynamodb = new DynamoDB.DocumentClient();
const connectionTable = process.env.CONNECTIONS_TABLE;

module.exports.handler = async (event, context) => {
  // console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  const { body, requestContext: { connectionId, routeKey }} = event;
  switch(routeKey) {
    case '$connect':
      await dynamodb.put({
        TableName: connectionTable,
        Item: {
          connectionId,
          ttl: parseInt((Date.now() / 1000) + 3600)
        }
      }).promise();
      break;

    case '$disconnect':
      await dynamodb.delete({
        TableName: connectionTable,
        Key: { connectionId }
      }).promise();
      break;

    case '$default':
    default:
      await apig.postToConnection({
        ConnectionId: connectionId,
        Data: `Received on $default: ${body}`
      }).promise();
  }

  return { statusCode: 200 };
}