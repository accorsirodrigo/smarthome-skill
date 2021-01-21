const log = require('../../log');

function handlePowerControl(request, context) {
    // get device ID passed in during discovery
    var requestMethod = request.directive.header.name;
    var responseHeader = request.directive.header;
    responseHeader.namespace = "Alexa";
    responseHeader.name = "Response";
    responseHeader.messageId = responseHeader.messageId + "-R";
    // get user token pass in request
    var requestToken = request.directive.endpoint.scope.token;
    var powerResult;

    if (requestMethod === "TurnOn") {

        // Make the call to your device cloud for control
        // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
        powerResult = "ON";
    }
    else if (requestMethod === "TurnOff") {
        // Make the call to your device cloud for control and check for success
        // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
        powerResult = "OFF";
    }
    var contextResult = {
        "properties": [{
            "namespace": "Alexa.PowerController",
            "name": "powerState",
            "value": powerResult,
            "timeOfSample": "2021-07-01T00:30:50.52Z", //retrieve from result.
            "uncertaintyInMilliseconds": 50
        }]
    };
    var response = {
        context: contextResult,
        event: {
            header: responseHeader,
            endpoint: {
                scope: {
                    type: "BearerToken",
                    token: requestToken
                },
                endpointId: "demo_id"
            },
            payload: {}
        }
    };
//        log("DEBUG", "Alexa.PowerController ", JSON.stringify(response));
    context.succeed(response);
};

module.exports = handlePowerControl;