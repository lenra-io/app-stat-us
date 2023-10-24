'use strict'

import { executeQuery, createDoc, updateDoc } from './api.js';
import Navigation from '../classes/Navigation.js';

export const homeNavigation = {
    state: {
        page: 'home'
    },
    history: []
};
export const collection = 'navigations';

/**
 * @param {any} api
 * @returns {Promise<Navigation>}
 */
export async function getNavigation(api) {
    const navs = await executeQuery(api, collection, {
        user: "@me"
    });
    return navs[0];
}

export async function home(api) {
    let navigation = await getNavigation(api);
    if (!navigation) {
        return createDoc(api, collection, { ...homeNavigation, user: "@me" });
    }
    else {
        return replaceNavigation(api, navigation, homeNavigation);
    }
}
export async function replaceNavigation(api, navigation, newNavigation) {
    navigation = navigation || await getNavigation(api);
    navigation = { ...navigation, ...newNavigation };
    return updateDoc(api, collection, navigation);
}
export async function replaceState(api, navigation, newState) {
    navigation = navigation || await getNavigation(api);
    navigation.state = newState;
    return updateDoc(api, collection, navigation);
}
export async function updateState(api, navigation, stateData) {
    navigation = navigation || await getNavigation(api);
    Object.entries(stateData)
        .forEach(([key, value]) => {
            navigation.state[key] = value;
        });
    return updateDoc(api, collection, navigation);
}
export async function pushState(api, navigation, state) {
    navigation = navigation || await getNavigation(api);
    if (state.page == navigation.state.page) {
        return this.updateState(api, navigation, state);
    }
    navigation.history.push(navigation.state);
    navigation.state = {
        ...state
    };
    return updateDoc(api, collection, navigation);
}


export async function popState(api, navigation, times) {
    navigation = navigation || await getNavigation(api);
    times = Math.max(1, Math.min(navigation.history.length, times || 1));
    while (times-- > 0)
        navigation.state = navigation.history.pop();
    return updateDoc(api, collection, navigation);
}
