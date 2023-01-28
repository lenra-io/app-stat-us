const Platform = require('../../classes/Platform.js');
const Post = require('../../classes/Post.js');
const PostStat = require('../../classes/PostStat.js');
const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js');
const { platformNavigation } = require('./platform_list.js');
const { url } = require('./url.js');

/**
 * 
 * @param {Post[]} posts 
 * @param {*} props 
 * @returns 
 */
function post_list(posts, props) {
    const limit = props.limit || props.pagination;
    let filteredPosts = [...posts]
        .sort((a, b) => b.date - a.date);
    if (limit) filteredPosts = filteredPosts.slice(0, limit);
    let children = filteredPosts.map(post => {
        return {
            type: "view",
            name: "post_card",
            coll: Post.collection,
            query: {
                _id: post._id
            }
        }
    });
    if (props.add) children.unshift({
        type: "button",
        text: "New post",
        onPressed: {
            action: "pushState",
            props: {
                page: "edit_post",
                platform: props.platform,
            }
        }
    });
    if (props.pagination && limit < posts.length) children.push({
        type: "button",
        text: "+",
        mainStyle: "secondary",
        onPressed: {
            action: "setStateProperty",
            props: {
                property: "limit",
                value: limit + 5
            }
        }
    });
    return {
        type: "flex",
        spacing: 16,
        mainAxisAlignment: "start",
        crossAxisAlignment: "stretch",
        direction: "vertical",
        children
    }
}

/**
 * 
 * @param {Post[]} param0 
 * @param {*} props 
 * @returns 
 */
function post_card([post], props) {
    let name = post.name;
    if (post.channel) name = `${post.channel} - ${name}`;
    return {
        type: "actionable",
        child: {
            type: "container",
            border: ui.border.all({
                width: 0.5,
                color: 0xFFDCE0E7
            }),
            decoration: {
                color: ui.color.white,
                borderRadius: ui.borderRadius.all(8),
                boxShadow: {
                    blurRadius: 10,
                    offset: {
                        dx: 4,
                        dy: 4
                    },
                    color: ui.color.opacity(ui.color.black, 0.7)
                },
            },
            child: {
                type: "flex",
                spacing: 16,
                mainAxisAlignment: "spaceEvenly",
                direction: "vertical",
                padding: {
                    left: 16,
                    right: 16
                },
                children: [
                    {
                        type: "flex",
                        spacing: 16,
                        children: [
                            {
                                type: "view",
                                name: "platform_card",
                                coll: Platform.collection,
                                query: {
                                    _id: post.platform
                                },
                                props: {
                                    size: 24,
                                    boxShadow: {}
                                }
                            },
                            {
                                type: "flexible",
                                child: {
                                    type: "text",
                                    style: {
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    },
                                    value: name
                                }
                            },
                            {
                                type: "view",
                                name: "updateStatus",
                                coll: PostStat.collection,
                                query: {
                                    post: post._id
                                },
                                props: {
                                    date: post.date,
                                }
                            }
                        ]
                    },
                    url([post], {}),
                    {
                        type: "view",
                        name: "post_stats",
                        coll: PostStat.collection,
                        query: {
                            post: post._id,
                        },
                        props: {
                            limit: 1,
                            postDate: post.date,
                        }
                    }
                ]
            }
        },
        onPressed: navigateToPostListener(post.platform, post._id),
    };
}

function post_title([post], props) {
    let child = {
        type: "text",
        value: post.name
    };
    if (props.padding) {
        child = {
            type: "container",
            padding: props.padding,
            child,
        };
    }
    if (props.onPressed) {
        child = {
            type: "actionable",
            child,
            onPressed: props.onPressed
        };
    }
    return child;
}

function navigateToPostListener(platformId, postId) {
    return {
        action: "replaceNavigation",
        props: postNavigation(platformId, postId),
    }
}

function postNavigation(platformId, postId) {
    // Deep copy
    const navigation = platformNavigation(platformId);
    navigation.history.push(navigation.state);
    navigation.state = {
        page: "post",
        platform: platformId,
        post: postId,
    }
    return navigation;
}

module.exports = {
    post_list,
    post_card,
    post_title,
    postNavigation,
}