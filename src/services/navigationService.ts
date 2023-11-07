import {Api} from '@lenra/app';
import Navigation from "../classes/Navigation.ts";
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
async function getNavigation(api: Api) {
    const navs = await lenraDocumentService.executeQuery(api, collection, {
        user: "@me"
    });
    return navs[0];
}

module.exports = {
    collection,
    homeNavigation,
    getNavigation,
    async home(api) {
        let navigation = await getNavigation(api);
        if (!navigation) {
            return lenraDocumentService.createDoc(api, collection, { ...homeNavigation, user: "@me" });
        }
        else {
            return replaceNavigation(api, navigation, homeNavigation);
        }
    },
    async replaceNavigation(api, navigation, newNavigation) {
        navigation = navigation || await getNavigation(api);
        navigation = { ...navigation, ...newNavigation };
        return lenraDocumentService.updateDoc(api, collection, navigation);
    },
    async replaceState(api, navigation, newState) {
        navigation = navigation || await getNavigation(api);
        navigation.state = newState;
        return lenraDocumentService.updateDoc(api, collection, navigation);
    },
    async updateState(api, navigation, stateData) {
        navigation = navigation || await getNavigation(api);
        Object.entries(stateData)
            .forEach(([key, value]) => {
                navigation.state[key] = value;
            });
        return lenraDocumentService.updateDoc(api, collection, navigation);
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
        return lenraDocumentService.updateDoc(api, collection, navigation);
    },
    async popState(api, navigation, times) {
        navigation = navigation || await getNavigation(api);
        times = Math.max(1, Math.min(navigation.history.length, times || 1));
        while (times-- > 0)
            navigation.state = navigation.history.pop();
        return lenraDocumentService.updateDoc(api, collection, navigation);
    }
}
