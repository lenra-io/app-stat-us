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
    console.log("state", state);
    return {
        type: "flex",
        direction: "vertical",
        spacing: 32,
        crossAxisAlignment: "center",
        children: [
            {
                type: "view",
                name: "platform_list",
                coll: Platform.collection,
                query: {},
                props: { add: true }
            },
            {
                type: "view",
                name: "post_list",
                coll: Post.collection,
                query: {},
                props: {
                    limit: state.limit,
                    pagination
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
function menu(_data, _props) {
    return {
        type: "view",
        name: "menu",
        props: {
            mainAction: {
                text: "New post",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "edit_post"
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