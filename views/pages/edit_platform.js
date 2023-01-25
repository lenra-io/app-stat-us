'use strict'

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, _props) {
    return {
        "type": "text",
        "value": "Edit platform page"
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
                text: "New game",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "newGame"
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
