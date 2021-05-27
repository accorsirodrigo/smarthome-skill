const Model = require('./dynamoModel');
const databases = require('./databaseEnum')

const model = new Model(databases.SMARTHOME_DATA);

async function findOndeData() {
    return await model.findOne();
};

async function filteredFind(uuid){
    return await model.filteredFind(
        "#device_id = :uuid", {":uuid":uuid}, {"#device_id":"device_id"}
    );
}

module.exports = {
    findOndeData: findOndeData,
    filteredFind: filteredFind
}