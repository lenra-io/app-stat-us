'use strict'

const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");
const { firstProperty } = require("../utils/data");
const ui = require("../utils/ui");

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, props) {
    const child = {
        type: "view",
        name: 'edit_post_form',
        props
    };
    if (props.state.post) {
        child.coll = Post.collection;
        child.query = {
            _id: props.state.post
        };
    }
    return child;
}

/**
 * 
 * @param {Post[]} param0 The posts to edit
 * @param {{state: any}} param1 
 * @returns 
 */
function form([post], { state }) {
    const date = post ? new Date(post.date) : new Date();
    const str = date.toISOString();
    const dateStr = state.date || str.substring(0, 10);
    const timeStr = state.time || str.substring(11, 19);
    return {
        type: "form",
        onSubmit: {
            action: "savePost"
        },
        child: {
            type: "container",
            constraints: { maxWidth: 600 },
            child: {
                type: "flex",
                spacing: 16,
                mainAxisAlignment: "start",
                crossAxisAlignment: "stretch",
                direction: "vertical",
                children: [
                    {
                        type: "view",
                        name: "platform_selector",
                        coll: Platform.collection,
                        query: {},
                        props: {
                            platform: state.platform || post?.platform
                        }
                    },
                    {
                        type: "textfield",
                        value: firstProperty("name", "", state, post),
                        name: "name",
                        style: {
                            decoration: {
                                labelText: "Post name"
                            },
                        }
                    },
                    {
                        type: "textfield",
                        value: firstProperty("channel", "", state, post),
                        name: "channel",
                        style: {
                            decoration: {
                                labelText: "Platform channel name",
                                helperText: "if needed"
                            },
                        }
                    },
                    {
                        type: "textfield",
                        value: firstProperty("url", "", state, post),
                        name: "url",
                        style: {
                            decoration: {
                                labelText: "Post URL",
                                helperText: "Full url: https://www.lenra.io/my-post",
                                icon: {
                                    type: "icon",
                                    value: "insert_link"
                                }
                            },
                        }
                    },
                    {
                        type: "textfield",
                        value: dateStr,
                        name: "date",
                        style: {
                            decoration: {
                                labelText: "Post date",
                                helperText: "Format: yyyy-mm-dd",
                                icon: {
                                    type: "icon",
                                    value: "calendar_today"
                                }
                            },
                        }
                    },
                    {
                        type: "textfield",
                        value: timeStr,
                        name: "time",
                        style: {
                            decoration: {
                                labelText: "Post time",
                                helperText: "At UTC with the next format: hh:mm:ss",
                                icon: {
                                    type: "icon",
                                    value: "access_time"
                                }
                            },
                        }
                    },
                    {
                        type: "button",
                        text: "Save",
                        submit: true,
                    }
                ]
            }
        }
    }
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, _props) {
    return {
        type: "view",
        name: "menu"
    }
}

module.exports = {
    content,
    menu,
    form,
}
