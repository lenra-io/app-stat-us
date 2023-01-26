'use strict'

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, _props) {
    return {
        "type": "text",
        "value": "Post page"
    }
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, {state}) {
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
                        post: state.post
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
