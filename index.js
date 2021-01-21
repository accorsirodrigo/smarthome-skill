const { v4: uuidv4 } = require('uuid');
const handleDiscovery = require('./src/controller/discovery/discoveryController');
const handlePowerControl = require('./src/controller/power/powerController');
const handlerTemperature = require('./src/controller/power/temperatureController');
const log = require('./src/log');

const handlerFunction = (request, context) => {
    if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
        log("DEBUG:", "Discover request: ",  JSON.stringify(request));
        handleDiscovery(request, context, "");
    } else if (request.directive.header.namespace === 'Alexa.PowerController') {
        if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
            log("DEBUG:", "TurnOn or TurnOff Request: ", JSON.stringify(request));
            handlePowerControl(request, context);
        }
    } else if (request.directive.header.namespace === 'Alexa' && request.directive.header.name === 'ReportState') {
        log("DEBUG:", "Request: ", JSON.stringify(request));
        handlerTemperature(request, context);
    } else {
        log("DEBUG:", "Alone Request: ", JSON.stringify(request));
    }
};

exports.handler = handlerFunction;