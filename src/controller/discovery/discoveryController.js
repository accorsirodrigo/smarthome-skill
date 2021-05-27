const log = require('../../log');
const { v4: uuidv4 } = require('uuid');
const devices = require('../../database/dynamoDevices');

const config = {
    manufacture:  "Accorsi smarthome company",
    version:"3"
};

async function handleDiscovery(request, context) {
    try{
        let dbDevices = await devices();

        let endpointsMap = [...dbDevices].map(data => ({
                endpointId: data.uuid,
                manufacturerName: config.manufacture,
                friendlyName: data.friendlyName,
                description: data.description,
                displayCategories: [data.displayCategories],
                cookie: {
                    type: data.displayCategories,
                    accountId: data.accountId
                },
                capabilities:[
                    {
                        type: "AlexaInterface",
                        interface: "Alexa",
                        version: config.version
                    },
                    {
                        type: "AlexaInterface",
                        proactivelyReported: true,
                        interface: data.interface,
                        version: config.version,
                        properties: {
                            supported: [{
                                name: "powerState"
                            }],
                                retrievable: true
                        }
                    }
                ]
            })
        );
        var header = request.directive.header;
        header.name = "Discover.Response"; 

        let payload = {
            endpoints: endpointsMap
        }

        let response = {
            event:{
                header:header,
                payload:payload
            }
        }

        log("DEBUG:", "Discovery Response: ", JSON.stringify(response));
        context.succeed(response);
    } catch (err) {
        //throw new DiscoveryError("handleDiscovery", err.message);
        log('ERROR:', 'Error discovering devices: ',err)
    }
};

module.exports = handleDiscovery