const powerEvent = require('./powerController')
const log = require('../../log');

module.exports = async function (request, context) {
    if (request.directive.header.namespace === 'Alexa.PowerController') {
        let switchable = request.directive.header.name;
        log("DEBUG:", `${switchable} Request: `, JSON.stringify(request));
        switch(switchable){
            case 'TurnOn':
            case 'TurnOff':
                powerEvent(request, context);
                break;
            case 'SetBrightness':
                break;
            case 'SetColor':
                break;
            case 'SetColorTemperature':
                break;
            default:
                log("DEBUG:", "DEFAULT Request: ", JSON.stringify(request));
        }
    }
}