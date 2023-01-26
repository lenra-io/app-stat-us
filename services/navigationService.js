'use strict'

const lenraDocumentService = require('./api');
const homeNavigation = {
    state: {
        page: 'home'
    },
    history: []
};
const collection = 'navigations';

async function getNavigation(api) {
    const navs = await lenraDocumentService.executeQuery(api, collection, {
        user: "@me"
    });
    return navs[0];
}

module.exports = {
    collection,
    getNavigation,
    async home(api) {
        let navigation = await getNavigation(api);
        if (!navigation) {
            console.log("create navigation");
            return lenraDocumentService.createDoc(api, collection, { ...homeNavigation, user: "@me" });
        }
        else {
            navigation = { ...navigation, ...homeNavigation };
            return lenraDocumentService.updateDoc(api, collection, navigation);
        }
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
        if (state.page==navigation.state.page) {
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
