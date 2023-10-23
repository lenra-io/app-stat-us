import { colors } from '@lenra/components';
import Platform, { collection } from '../classes/Platform.js';
import { fields } from '../classes/PostStat.js';
import { updateDoc, createDoc, getDoc } from '../services/api.js';
import { popState, replaceState, updateState } from '../services/navigationService.js';
import navigationService from '../services/navigationService.js';
import { urlRegex } from '../views/utils/data.js';
const { getNavigation } = navigationService;

export async function updatePlatform(props, event, api) {
    const navigation = await getNavigation(api);
    const platform = await getDoc(api, collection, navigation.state.platform);
    const errors = [];
    if (props.property == "colorHex") {
        const color = colors.fromHex(navigation.state.colorHex);
        if (color)
            platform.color = color;
        else {
            errors.push({ field: "color", message: "The value is not a valid color" });
        }
    }
    else {
        platform[props.property] = event.value || props.value;
    }
    if (errors.length == 0) {
        return updateDoc(api, collection, platform);
    }
    else {
        return updateState(api, navigation, {
            errors
        });
    }
}

export async function savePlatform(props, event, api) {
    const navigation = await getNavigation(api);
    let platform = navigation.state?.platform ? await getDoc(api, collection, navigation.state.platform) : new Platform();
    const errors = [];
    // update fields
    for (const key in platform) {
        if (Object.hasOwnProperty.call(platform, key) && Object.hasOwnProperty.call(navigation.state, key)) {
            platform[key] = navigation.state[key];
        }
    }
    fields.forEach(field => {
        platform[field.name] = (field.name in navigation.state) ? navigation.state[field.name] : true;
    });
    if ("colorHex" in navigation.state) {
        const color = colors.fromHex(navigation.state.colorHex);
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
    else if (!urlRegex.test(platform.url)) errors.push({ field: "url", message: "The platform url does not seem to be correct" });
    if (!platform.color && platform.color !== 0) errors.push({ field: "color", message: "The platform color is required" });
    if (errors.length == 0) {
        // save or update
        const isUpdate = !!platform._id;
        platform = await (isUpdate ? updateDoc : createDoc).call(null, api, collection, platform);
        if (isUpdate) return popState(api, navigation);
        return replaceState(api, navigation, {
            page: "platform",
            platform: platform._id,
        });
    }
    else {
        return updateState(api, navigation, {
            errors
        });
    }
}
