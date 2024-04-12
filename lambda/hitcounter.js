const { DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function (event) {
    console.log("Request: ", JSON.stringify(event, undefined, 2));

    //Here we are creating the AWS SDK client.
    const dynamo = new DynamoDB();
    const lambda = new Lambda();

    // we're updating the entry for "path" with hits++
    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValue: { ':incr': { N: '1' } }
    }).promise();

    // we're calling downstream function and capture responses
    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(event)
    }).promise();

    console.log('Downstream Response: ', JSON.stringify(resp, undefined, 2));
    return JSON.stringify(resp.Payload);
}