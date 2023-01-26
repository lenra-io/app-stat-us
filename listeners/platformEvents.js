const Platform = require('../classes/Platform.js');
const { updateDoc, createDoc } = require('../services/api.js');
const { popState } = require('../services/navigationService.js');
const navigationService = require('../services/navigationService.js');
const { getNavigation } = navigationService;
const platformService = require('../services/platformService.js');
const ui = require('../views/utils/ui.js');

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

async function savePlatform(props, event, api) {
    const navigation = await getNavigation(api);
    let platform = navigation.state?.platform ? await platformService.get(api, navigation.state.platform) : new Platform();
    const errors = [];
    // update fields
    for (const key in platform) {
        if (Object.hasOwnProperty.call(platform, key) && Object.hasOwnProperty.call(navigation.state, key)) {
            console.log("Update", key);
            platform[key] = navigation.state[key];
        }
    }
    if ("colorHex" in navigation.state) {
        const color = ui.color.fromHex(navigation.state.colorHex);
        if (color)
            platform.color = color;
        else {
            errors.push({ field: "color", message: "The value is not a valid color" });
        }
    }
    platform.name = platform.name?.trim();
    platform.url = platform.url?.trim();
    // check required fields
    if (!platform.name) errors.push({ field: "name", message: "The platform name is required" });
    else if (platform.name.length < 3) errors.push({ field: "name", message: "The platform name must contain at least 3 characters" });
    if (!platform.url) errors.push({ field: "url", message: "The platform url is required" });
    else if (!urlRegex.test(platform.url)) errors.push({ field: "url", message: "The platform name must contain at least 3 characters" });
    if (errors.length == 0) {
        // save or update
        const isUpdate = !!platform._id;
        platform = await (isUpdate ? updateDoc : createDoc).call(null, api, platformService.collection, platform);
        if (isUpdate) return popState(api, navigation);
        return updateDoc(api, navigationService.collection, {
            ...navigation,
            state: {
                page: "platform",
                platform: platform._id,
            }
        });
    }
}

module.exports = {
    savePlatform
}