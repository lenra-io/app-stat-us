'use strict'

const pagination = 5;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return {
        type: "flex",
        direction: "vertical",
        spacing: 32,
        mainAxisAlignment: "spaceEvenly",
        crossAxisAlignment: "center",
        children: [
            {
                type: "view",
                name: "platform_list",
                // "coll": "counter",
                // "query": {
                //     "user": "@me"
                // },
                props: { add: true }
            },
            {
                type: "view",
                name: "post_list",
                // "coll": "counter",
                // "query": {
                //     "user": "@me"
                // },
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
                        page: "new_post"
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