'use strict'

const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");

const pagination = 5;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
        type: "flex",
        spacing: 16,
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
                                page: "edit_platform",
                                platform: state.platform
                            }
                        }
                    }
                ]
            },
            {
                type: "view",
                name: "url",
                coll: Platform.collection,
                query: {
                    _id: state.platform
                },
            },
            {
                type: "view",
                name: "post_list",
                coll: Post.collection,
                query: {
                    platform: state.platform
                },
                props: {
                    // add: true,
                    limit: state.limit,
                    pagination,
                    platform: state.platform,
                }
            }
        ]
    }
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
                text: "New post",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "edit_post",
                        platform: state.platform
                    }
                }
            }
        }
    }
}

module.exports = {
    content,
    menu,
}
