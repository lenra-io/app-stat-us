const Post = require('../classes/Post.js');
const PostStat = require('../classes/PostStat.js');
const { updateDoc, createDoc, getDoc } = require('../services/api.js');
const { popState, updateState, replaceState } = require('../services/navigationService.js');
const navigationService = require('../services/navigationService.js');
const { urlRegex, dateRegex, timeRegex } = require('../views/utils/data.js');
const { getNavigation } = navigationService;
const ui = require('../views/utils/ui.js');

async function savePost(_props, event, api) {
    const navigation = await getNavigation(api);
    let post = navigation.state?.post ? await getDoc(api, Post.collection, navigation.state.post) : new Post();
    console.log("savePost", post, event);
    const errors = [];
    // update fields
    for (const key in post) {
        if (Object.hasOwnProperty.call(post, key) && Object.hasOwnProperty.call(event.value, key)) {
            console.log("update", key);
            post[key] = event.value[key];
        }
    }
    post.name = post.name?.trim();
    post.platform = navigation.state.platform;
    post.url = post.url?.trim();
    const dateValid = dateRegex.test(event.value.date);
    const timeValid = timeRegex.test(event.value.time);

    if (dateValid && timeValid) post.date = Date.parse(`${event.value.date}T${event.value.time}Z`);
    console.log("savePost", post);

    // check required fields
    if (!post.name) errors.push({ field: "name", message: "The post name is required" });
    else if (post.name.length < 3) errors.push({ field: "name", message: "The post name must contain at least 3 characters" });
    if (!post.url) errors.push({ field: "url", message: "The post url is required" });
    else if (!urlRegex.test(post.url)) errors.push({ field: "url", message: "The post url does not seem to be correct" });
    if (!dateValid) errors.push({ field: "date", message: "The date format is not correct" });
    if (!timeValid) errors.push({ field: "time", message: "The time format is not correct" });
    if (errors.length == 0) {
        // save or update
        const isUpdate = !!post._id;
        post = await (isUpdate ? updateDoc : createDoc).call(null, api, Post.collection, post);
        if (isUpdate) return popState(api, navigation);
        return replaceState(api, navigation, {
            page: "post",
            post: post._id,
            platform: post.platform,
        });
    }
    else {
        console.log(errors);
        return updateState(api, navigation, {
            errors
        });
    }
}

async function savePostStat(_props, event, api) {
    const navigation = await getNavigation(api);
    let postStat = new PostStat();
    console.log("savePostStat", postStat, event);
    const errors = [];
    // update fields
    postStat.post = navigation.state.post;
    const dateValid = dateRegex.test(event.value.date);
    const timeValid = timeRegex.test(event.value.time);
    PostStat.fields.forEach(field => {
        if (field in event.value) {
            if (!event.value[field]) errors.push({ field, message: "This field is required" });
            else {
                try {
                    postStat[field] = parseInt(event.value[field]);
                }
                catch (error) {
                    errors.push({ field, message: error.message });
                }
            }
        }
    });

    if (dateValid && timeValid) postStat.date = Date.parse(`${event.value.date}T${event.value.time}Z`);
    console.log("savePostStat", postStat);

    // check required fields
    if (!dateValid) errors.push({ field: "date", message: "The date format is not correct" });
    if (!timeValid) errors.push({ field: "time", message: "The time format is not correct" });
    if (errors.length == 0) {
        // save or update
        const isUpdate = !!postStat._id;
        postStat = await (isUpdate ? updateDoc : createDoc).call(null, api, Post.collection, postStat);
        if (isUpdate) return popState(api, navigation);
        return replaceState(api, navigation, {
            page: "post",
            post: postStat._id,
            platform: postStat.platform,
        });
    }
    else {
        console.log(errors);
        return updateState(api, navigation, {
            errors
        });
    }
}

module.exports = {
    savePost,
    savePostStat,
}