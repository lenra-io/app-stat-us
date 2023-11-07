import { Api, ListenerRequest } from '@lenra/app';
import navigationService from "../services/navigationService.ts";
import { firstProperty } from "../views/utils/data.js";

export function home(_props: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    return navigationService.home(api);
}

export function replaceNavigation(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.replaceNavigation(api, null, props);
}

export function setPage(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.pushState(api, null, { page: props.page });
}

export function pushState(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.pushState(api, null, props);
}

export function popState(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.popState(api, null, props.times);
}

export function replaceState(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.replaceState(api, null, props);
}

export function setStateProperty(props: {property: string}, event: ListenerRequest['event'], api: Api) {
    console.log("setStateProperty", event, props);
    return navigationService.updateState(api, null, { [props.property]: firstProperty("value", undefined, event, props) });
}

export function openModal(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.updateState(api, null, { modal: props.modal });
}

export function closeModal(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    return navigationService.updateState(api, null, { modal: undefined });
}
