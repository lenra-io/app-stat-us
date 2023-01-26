'use strict'

const pagination = 10;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
        "type": "view",
        "name": "post_list",
        // "coll": "counter",
        // "query": {
        //     "user": "@me"
        // },
        "props": {
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
                text: "Edit",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "edit_platform",
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
