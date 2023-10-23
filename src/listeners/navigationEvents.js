import { home as _home, replaceNavigation as _replaceNavigation, pushState as _pushState, popState as _popState, replaceState as _replaceState, updateState } from '../services/navigationService.js';
import firstProperty from '../views/utils/data.js';

export function home(props, event, api) {
    return _home(api);
}

export function replaceNavigation(props, event, api) {
    return _replaceNavigation(api, null, props);
}

export function setPage(props, event, api) {
    return _pushState(api, null, { page: props.page });
}

export function pushState(props, event, api) {
    return _pushState(api, null, props);
}

export function popState(props, event, api) {
    return _popState(api, null, props.times);
}

export function replaceState(props, event, api) {
    return _replaceState(api, null, props);
}

export function setStateProperty(props, event, api) {
    console.log("setStateProperty", event, props);
    return updateState(api, null, { [props.property]: firstProperty("value", undefined, event, props) });
}

export function openModal(props, event, api) {
    return updateState(api, null, { modal: props.modal });
}

export function closeModal(props, event, api) {
    return updateState(api, null, { modal: undefined });
}
