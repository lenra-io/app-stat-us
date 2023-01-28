const PostStat = require('../../classes/PostStat.js');
const ui = require('../utils/ui.js');

/**
 * @param {Document[]} docs
 * @param {*} props 
 * @returns 
 */
function url([doc], props) {
    return {
        type: "flex",
        spacing: 8,
        crossAxisAlignment: "center",
        children: [
            {
                type: "icon",
                value: "link",
                size: 16,
            },
            {
                type: "text",
                style: {
                    color: ui.color.blue,
                },
                value: doc.url
            },
        ]
    };
}

module.exports = {
    url
}