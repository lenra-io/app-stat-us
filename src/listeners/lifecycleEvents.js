'use strict'

import { home } from '../services/navigationService.js';

export function onEnvStart(props, event, api) {
}

export function onEnvStop(props, event, api) {
}

export function onUserFirstJoin(props, event, api) {
    return home(api);
}

export function onUserQuit(props, event, api) {
    // TODO: remove user data
}

export function onSessionStart(props, event, api) {
    // TODO: do something
}

export function onSessionStop(props, event, api) {
    // TODO: do something
}
