'use strict'

const navigationService = require('../services/navigationService.js');

function onEnvStart(props, event, api) {
}

function onEnvStop(props, event, api) {
}

function onUserFirstJoin(props, event, api) {
    return navigationService.home(api);
}

function onUserQuit(props, event, api) {
    // TODO: remove user data
}

function onSessionStart(props, event, api) {
    // TODO: do something
}

function onSessionStop(props, event, api) {
    // TODO: do something
}

module.exports = {
    onEnvStart,
    onEnvStop,
    onUserFirstJoin,
    onUserQuit,
    onSessionStart,
    onSessionStop
}