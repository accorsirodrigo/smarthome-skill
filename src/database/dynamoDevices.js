const Model = require('./dynamoModel');
const databases = require('./databaseEnum')

const model = new Model(databases.SMARTHOME_DEVICES);

module.exports = async function() {
    return await model.findAll();
}