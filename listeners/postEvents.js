const Platform = require('../classes/Platform.js');
const Post = require('../classes/Post.js');
const { updateDoc, createDoc, getDoc } = require('../services/api.js');
const { popState } = require('../services/navigationService.js');
const navigationService = require('../services/navigationService.js');
const { getNavigation } = navigationService;
const ui = require('../views/utils/ui.js');

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

async function savePost(_props, event, api) {
    const navigation = await getNavigation(api);
    let post = navigation.state?.post ? await getDoc(api, Post.collection, navigation.state.post) : new Post();
    console.log("savePost", post, event);
    // const errors = [];
    // // update fields
    // for (const key in post) {
    //     if (Object.hasOwnProperty.call(post, key) && Object.hasOwnProperty.call(navigation.state, key)) {
    //         console.log("Update", key);
    //         post[key] = navigation.state[key];
    //     }
    // }
    // post.name = post.name?.trim();
    // post.url = post.url?.trim();
    // // check required fields
    // if (!post.name) errors.push({ field: "name", message: "The platform name is required" });
    // else if (post.name.length < 3) errors.push({ field: "name", message: "The platform name must contain at least 3 characters" });
    // if (!post.url) errors.push({ field: "url", message: "The platform url is required" });
    // else if (!urlRegex.test(post.url)) errors.push({ field: "url", message: "The platform name must contain at least 3 characters" });
    // if (errors.length == 0) {
    //     // save or update
    //     const isUpdate = !!post._id;
    //     post = await (isUpdate ? updateDoc : createDoc).call(null, api, Platform.collection, post);
    //     if (isUpdate) return popState(api, navigation);
    //     return updateDoc(api, navigationService.collection, {
    //         ...navigation,
    //         state: {
    //             page: "platform",
    //             platform: post._id,
    //         }
    //     });
    // }
}

module.exports = {
    savePost
}