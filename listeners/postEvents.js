const Post = require('../classes/Post.js');
const PostStat = require('../classes/PostStat.js');
const { updateDoc, createDoc, getDoc } = require('../services/api.js');
const { popState, updateState, replaceState, replaceNavigation } = require('../services/navigationService.js');
const navigationService = require('../services/navigationService.js');
const { postNavigation } = require('../views/components/post_list.js');
const { urlRegex, dateRegex, timeRegex } = require('../views/utils/data.js');
const { getNavigation } = navigationService;
const ui = require('../views/utils/ui.js');

async function savePost(_props, event, api) {
    const navigation = await getNavigation(api);
    let post = navigation.state?.post ? await getDoc(api, Post.collection, navigation.state.post) : new Post();
    const errors = [];
    // update fields
    for (const key in post) {
        if (Object.hasOwnProperty.call(post, key) && Object.hasOwnProperty.call(event.value, key)) {
            post[key] = event.value[key];
        }
    }
    post.name = post.name?.trim();
    post.platform = navigation.state.platform;
    post.url = post.url?.trim();
    const dateValid = dateRegex.test(event.value.date);
    const timeValid = timeRegex.test(event.value.time);

    if (dateValid && timeValid) post.date = Date.parse(`${event.value.date}T${event.value.time}Z`);

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
        return replaceNavigation(api, navigation, postNavigation(post.platform, post._id));
    }
    else {
        return updateState(api, navigation, {
            errors
        });
    }
}

async function savePostStat(_props, event, api) {
    const navigation = await getNavigation(api);
    let postStat = new PostStat();
    const errors = [];
    // update fields
    postStat.post = navigation.state.post;
    const dateValid = dateRegex.test(event.value.date);
    const timeValid = timeRegex.test(event.value.time);
    PostStat.fields.forEach(({ name }) => {
        if (name in event.value) {
            if (!event.value[name]) errors.push({ field: name, message: "This field is required" });
            else {
                try {
                    postStat[name] = parseInt(event.value[name]);
                }
                catch (error) {
                    errors.push({ field: name, message: error.message });
                }
            }
        }
    });

    if (dateValid && timeValid) postStat.date = Date.parse(`${event.value.date}T${event.value.time}Z`);

    // check required fields
    if (!dateValid) errors.push({ field: "date", message: "The date format is not correct" });
    if (!timeValid) errors.push({ field: "time", message: "The time format is not correct" });
    if (errors.length == 0) {
        // save or update
        postStat = await createDoc(api, PostStat.collection, postStat);
        return replaceNavigation(api, navigation, postNavigation(navigation.state.platform, navigation.state.post));
    }
    else {
        return updateState(api, navigation, {
            errors
        });
    }
}

module.exports = {
    savePost,
    savePostStat,
}