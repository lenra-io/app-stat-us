const navigationService = require('../services/navigationService.js');

function home(props, event, api) {
    return navigationService.home(api);
}

function setPage(props, event, api) {
    return navigationService.pushState(api, null, {page: props.page});
}

function pushState(props, event, api) {
    return navigationService.pushState(api, null, props);
}

function popState(props, event, api) {
    return navigationService.popState(api, null, props.times);
}

function setStateProperty(props, event, api) {
    return navigationService.updateState(api, null, {[props.property]: event.value || props.value});
}

function openModal(props, event, api) {
    return navigationService.updateState(api, null, {modal: props.modal});
}

function closeModal(props, event, api) {
    return navigationService.updateState(api, null, {modal: undefined});
}

module.exports = {
    home,
    setPage,
    pushState,
    popState,
    setStateProperty,
    openModal,
    closeModal
}