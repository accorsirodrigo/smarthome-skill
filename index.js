const { v4: uuidv4 } = require('uuid');
const handleDiscovery = require('./src/controller/discovery/discoveryController');
const handleEvent = require('./src/controller/event/eventHandler');
const handleReport = require('./src/controller/report/reportController');
const log = require('./src/log');

const handlerFunction = (request, context) => {
    if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
        log("DEBUG:", "Discover request: ",  JSON.stringify(request));
        handleDiscovery(request, context);
    } else if (request.directive.header.namespace === 'Alexa' && request.directive.header.name === 'ReportState') {
        log("DEBUG:", "Request: ", JSON.stringify(request));
        handleReport(request, context);
    } else {
        log("DEBUG:", "Alone Request: ", JSON.stringify(request));
        handleEvent(request, context);
    }
};

exports.handler = handlerFunction;