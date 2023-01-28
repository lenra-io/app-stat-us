'use strict'

const PostStat = require("../../classes/PostStat");

const pagination = 10;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
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
    menu,
}
