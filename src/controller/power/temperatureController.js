const log = require('../../log');
const db = require('../../database/dynamoModel');

async function handlerTemperature(request, context) {
    let dataDB = await db.findOne('smarthome_data');
    dataDB = JSON.parse(dataDB)
    log('DEBUG:', 'data: ', dataDB);
    var sampleTimeIso = new Date().toISOString();
    var responseContext = {
        properties: [{
            namespace: "Alexa.PowerController",
            name: "powerState",
            value: "ON",
            timeOfSample: sampleTimeIso,
            uncertaintyInMilliseconds: 0
        }]
    };
    
    var responseTemp = {
        properties: [{
            namespace: "Alexa.TemperatureSensor",
            name: "temperature",
            value: {
                value: dataDB.value,
                scale: "CELSIUS"
            },
            timeOfSample: sampleTimeIso,
            uncertaintyInMilliseconds: 0
        }]
    };
    
    var responseHeader = {
        namespace: "Alexa",
        name: "StateReport",
        payloadVersion: "3",
        messageId: "2-aaa",
        correlationToken: request.directive.header.correlationToken
    };

    var responseEndpoint = {
        endpointId: "demo_id"
    };

    var stateResponse = {
        context: responseTemp,
        event: {
            header: responseHeader,
            endpoint: responseEndpoint,
            payload: {}
        }
    };
        
        
    log("DEBUG:", "Report Response: ", JSON.stringify({ payload: stateResponse }));

    context.succeed(stateResponse);
};

module.exports = handlerTemperature;