const log = require('../../log');
const { v4: uuidv4 } = require('uuid');

const config = {
    manufacture:  "Accorsi smarthome company",
    version:"3"
};

function handleDiscovery(request, context) {
    let devcs = [{

    }]
    var payload = {
        "endpoints":
        [
            {
                "endpointId": uuidv4(),
                "manufacturerName": config.manufacture,
                "friendlyName": "Cozinha",
                "description": "Smart Device Switch",
                "displayCategories": ["TEMPERATURE_SENSOR"],
                "cookie": {
                    "type": "temperatureController"
                },
                "capabilities":
                [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": config.version
                    },
                    {
                        "interface": "Alexa.TemperatureSensor",
                        "version": "3",
                        "version": config.version,
                        "properties": {
                            "supported": [{
                                "name": "powerState"
                            }],
                                "retrievable": true
                        }
                    }
                ]
            },{
                "endpointId": uuidv4(),
                "manufacturerName": config.manufacture,
                "friendlyName": "Cozinha Luz",
                "description": "Smart Device Switch",
                "displayCategories": ["LIGHT"],
                "cookie": {
                    "type": "powerController",//defined by user
                    "key2": "There can be multiple entries",
                    "key3": "but they should only be used for reference purposes.",
                    "key4": "This is not a suitable place to maintain current endpoint state."
                },
                "capabilities":
                [
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa",
                        "version": config.version
                    },
                    {
                        "type": "AlexaInterface",
                        "interface": "Alexa.PowerController",
                        "version": config.version,
                        "properties": {
                            "supported": [{
                                "name": "powerState"
                            }],
                                "retrievable": true
                        }
                    }
                ]
            }
        ]
    };
    var header = request.directive.header;
    header.name = "Discover.Response";
//        log("DEBUG", "Discovery Response: ", JSON.stringify({ header: header, payload: payload }));
    context.succeed({ event: { header: header, payload: payload } });
};

module.exports = handleDiscovery;