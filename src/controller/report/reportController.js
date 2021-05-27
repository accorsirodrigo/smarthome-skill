const log = require('../../log');
const dataFinder = require('../../database/dynamoData');

const apl = {
  "type": "APLT",
  "version": "1.0",
  "mainTemplate": {
    "items": [
      {
        "type": "Text",
        "text": "HI."
      }
    ]
  }
};

async function getPower(data){
    let sampleTimeIso = new Date().toISOString();
    return {
        properties: [{
            namespace: "Alexa.PowerController",
            name: "powerState",
            value: "ON",
            timeOfSample: sampleTimeIso,
            uncertaintyInMilliseconds: 0
        }]
    }
};

async function getTemp(data){
    let sampleTimeIso = new Date().toISOString();
    let dataDB = await dataFinder.filteredFind(data);

    return {
        properties: [{
            namespace: "Alexa.TemperatureSensor",
            name: "temperature",
            value: {
                value: parseFloat(dataDB.Items[0].value).toFixed(0),
                scale: "CELSIUS"
            },
            timeOfSample: sampleTimeIso,
            uncertaintyInMilliseconds: 0
        }]
    }
};

module.exports = async function(request, context) {
    try{
        let deviceUUID = request.directive.endpoint.endpointId;
        let deviceType = request.directive.endpoint.cookie.type;

        let responseObject;
        
        switch(deviceType){
            case "TEMPERATURE_SENSOR":
                responseObject = await getTemp(deviceUUID);
                break;
            case "LIGHT":
                responseObject = await getPower();
                break;
            default:
                responseObject = await getTemp(deviceUUID);
                break;
        }

        let header = request.directive.header;
        header.name = "StateReport";

        let stateResponse = {
            context: responseObject,
            event: {
                header: header,
                endpoint: {
                    endpointId: request.directive.endpoint.endpointId
                },
                payload: {}
            }
        };
           
        log("DEBUG:", "Report Response: ", JSON.stringify(stateResponse));
        context.succeed(stateResponse);
    }catch(err){
        log('ERROR: ', err, '');
    }
};