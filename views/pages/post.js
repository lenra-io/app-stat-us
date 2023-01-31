'use strict'

const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");
const PostStat = require("../../classes/PostStat");
const { url } = require("../components/url");

const pagination = 10;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
        type: "flex",
        spacing: 32,
        mainAxisAlignment: "start",
        crossAxisAlignment: "stretch",
        direction: "vertical",
        children: [
            {
                type: "flex",
                spacing: 16,
                crossAxisAlignment: "center",
                children: [
                    {
                        type: "flexible",
                        child: {
                            type: "view",
                            name: "platform_title",
                            coll: Platform.collection,
                            query: {
                                _id: state.platform
                            },
                            props: {
                                onPressed: null,
                                size: 32,
                                fontWeight: 'bold',
                            }
                        }
                    },
                    {
                        type: "button",
                        mainStyle: "secondary",
                        text: "Edit",
                        onPressed: {
                            action: "pushState",
                            props: {
                                page: "edit_post",
                                post: state.post,
                                platform: state.platform
                            }
                        }
                    }
                ]
            },
            {
                type: "view",
                name: "post_infos",
                coll: Post.collection,
                query: {
                    _id: state.post
                }
            },
            {
                type: "view",
                name: "post_stats",
                coll: PostStat.collection,
                query: {
                    post: state.post,
                },
                props: {
                    limit: state.limit,
                    pagination
                }
            }
        ]
    };
}

/**
 * @param {Post[]} posts 
 * @param {*} props 
 * @returns 
 */
function infos([post], props) {
    let name = post.name;
    if (post.channel) name = `${post.channel} - ${name}`;
    return {
        type: "flex",
        spacing: 16,
        direction: "vertical",
        children: [
            {
                type: "text",
                style: {
                    fontSize: 24,
                    fontWeight: "bold",
                },
                value: name
            },
            {
                type: "text",
                value: `type: ${Post.types.find(type => type.name == post.type)?.displayName || "Not defined"}`
            },
            url([post], {}),
        ]
    };
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, { state }) {
    return {
        type: "view",
        name: "menu",
        props: {
            mainAction: {
                text: "Add stats",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "new_post_stats",
                        post: state.post,
                        platform: state.platform,
                    }
                }
            }
        }
    }
}

module.exports = {
    content,
    infos,
    menu,
}
