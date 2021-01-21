const model = require('./dynamoModel');

module.exports = async function() {
    return await model.findAll('smarthome_devices');
}