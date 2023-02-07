'use strict'

const { View } = require("@lenra/components");

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, _props) {
    return Text.new("Add platform stats page");
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, _props) {
    return View.new("menu")
        .props({
            mainAction: {
                text: "New game",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "newGame"
                    }
                }
            }
        });
}

module.exports = {
    content,
    menu,
}
