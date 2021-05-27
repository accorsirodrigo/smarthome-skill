const log = require('../log')
const AWS = require('aws-sdk')
var docClient = new AWS.DynamoDB.DocumentClient();

//https://dynobase.dev/dynamodb-nodejs/
//https://www.fernandomc.com/posts/eight-examples-of-fetching-data-from-dynamodb-with-node/
//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

class DynamoModel {
    constructor(tableName){
        this.tableName = tableName;
    }

    async findOne() {
        try{
            let data =  await docClient.scan({
                TableName : this.tableName,
                Limit: 1,
                ScanIndexForward: true
            }).promise()
            log('DEBUG:', `Success query one on ${this.tableName}:` , JSON.stringify(data))
            return JSON.stringify(data.Items[0]);
        } catch (err){
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
    }

    async findAll() {
        try{
            let data =  await docClient.scan({
                TableName : this.tableName,
                ScanIndexForward: true
            }).promise()
            log('DEBUG:', `Success query one on ${this.tableName}:` , JSON.stringify(data))
            return data.Items;
        } catch (err){
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
    }

    async filteredFind(filter, params, filterNames) {
        try{
            let data =  await docClient.scan({
                TableName : this.tableName,
                ScanIndexForward: true,
                FilterExpression: filter,
                ExpressionAttributeValues: params,
                ExpressionAttributeNames: filterNames
            }).promise()
            log('DEBUG:', `Success query with filter on ${this.tableName}:` , JSON.stringify(data))
            return data;
        } catch (err){
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
    }

    async findByUUID(uuid) {
        try{
            let params = {
                TableName: this.tableName,
                FilterExpression: '#uuid = :uuid',
                ExpressionAttributeNames: {"#uuid": "uuid"},
                ExpressionAttributeValues: {
                    ':uuid':uuid
                }
            };
            let data =  await docClient.scan(params).promise()
            log('DEBUG:', `Success query by UUID on ${this.tableName}:` , JSON.stringify(data))
            return data.Items[0];
        } catch (err){
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
    }    
}

module.exports = DynamoModel;