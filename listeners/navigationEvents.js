const navigationService = require('../services/navigationService.js');
const { firstProperty } = require('../views/utils/data.js');

function home(props, event, api) {
    return navigationService.home(api);
}

function replaceNavigation(props, event, api) {
    return navigationService.replaceNavigation(api, null, props);
}

function setPage(props, event, api) {
    return navigationService.pushState(api, null, { page: props.page });
}

function pushState(props, event, api) {
    return navigationService.pushState(api, null, props);
}

function popState(props, event, api) {
    return navigationService.popState(api, null, props.times);
}

function replaceState(props, event, api) {
    return navigationService.replaceState(api, null, props);
}

function setStateProperty(props, event, api) {
    console.log("setStateProperty", event, props);
    return navigationService.updateState(api, null, { [props.property]: firstProperty("value", undefined, event, props) });
}

function openModal(props, event, api) {
    return navigationService.updateState(api, null, { modal: props.modal });
}

function closeModal(props, event, api) {
    return navigationService.updateState(api, null, { modal: undefined });
}

module.exports = {
    home,
    replaceNavigation,
    setPage,
    pushState,
    popState,
    replaceState,
    setStateProperty,
    openModal,
    closeModal
}