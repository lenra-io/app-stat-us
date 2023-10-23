'use strict'

import { executeQuery, createDoc, updateDoc } from './api.js';
import Navigation from '../classes/Navigation.js';
const homeNavigation = {
    state: {
        page: 'home'
    },
    history: []
};
const collection = 'navigations';

/**
 * @param {any} api
 * @returns {Promise<Navigation>}
 */
async function getNavigation(api) {
    const navs = await executeQuery(api, collection, {
        user: "@me"
    });
    return navs[0];
}

export default {
    collection,
    homeNavigation,
    getNavigation,
    async home(api) {
        let navigation = await getNavigation(api);
        if (!navigation) {
            return createDoc(api, collection, { ...homeNavigation, user: "@me" });
        }
        else {
            return replaceNavigation(api, navigation, homeNavigation);
        }
    },
    async replaceNavigation(api, navigation, newNavigation) {
        navigation = navigation || await getNavigation(api);
        navigation = { ...navigation, ...newNavigation };
        return updateDoc(api, collection, navigation);
    },
    async replaceState(api, navigation, newState) {
        navigation = navigation || await getNavigation(api);
        navigation.state = newState;
        return updateDoc(api, collection, navigation);
    },
    async updateState(api, navigation, stateData) {
        navigation = navigation || await getNavigation(api);
        Object.entries(stateData)
            .forEach(([key, value]) => {
                navigation.state[key] = value;
            });
        return updateDoc(api, collection, navigation);
    },
    async pushState(api, navigation, state) {
        navigation = navigation || await getNavigation(api);
        if (state.page == navigation.state.page) {
            return this.updateState(api, navigation, state);
        }
        navigation.history.push(navigation.state);
        navigation.state = {
            ...state
        };
        return updateDoc(api, collection, navigation);
    },
    async popState(api, navigation, times) {
        navigation = navigation || await getNavigation(api);
        times = Math.max(1, Math.min(navigation.history.length, times || 1));
        while (times-- > 0)
            navigation.state = navigation.history.pop();
        return updateDoc(api, collection, navigation);
    }
}
