const log = require('../log')
const AWS = require('aws-sdk')
var docClient = new AWS.DynamoDB.DocumentClient();

//https://dynobase.dev/dynamodb-nodejs/
//https://www.fernandomc.com/posts/eight-examples-of-fetching-data-from-dynamodb-with-node/
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

async function findOne(tableName) {
    try{
        let data =  await docClient.scan({
            TableName : tableName,
            Limit: 1,
            ScanIndexForward: true
        }).promise()
        log('DEBUG:', `Success query one on ${tableName}:` , JSON.stringify(data))
        return JSON.stringify(data.Items[0]);
    } catch (err){
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    }
}

async function findAll(tableName) {
    try{
        let data =  await docClient.scan({
            TableName : tableName,
            ScanIndexForward: true
        }).promise()
        log('DEBUG:', `Success query one on ${tableName}:` , JSON.stringify(data))
        return data.Items;
    } catch (err){
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    }
}

module.exports = {
    findOne: findOne,
    findAll: findAll
}