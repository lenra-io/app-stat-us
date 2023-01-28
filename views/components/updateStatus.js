const ui = require('../utils/ui.js');
const defaultDelay = 7 * 24 * 3600 * 1000; // 7 days

/**
 * @param {{date: Number}[]} docs
 * @param {{date: Number, outdatedDelay: Number?}} props 
 * @returns 
 */
function updateStatus(docs, props) {
    const date = [...docs.map(doc => doc.date), props.date].sort((a, b) => b - a)[0];
    const delay = props.delay || defaultDelay;
    const diff = Date.now() - date;
    const size = props.size || 12;
    let color = ui.color.green;
    let text = "Up to date";
    if (diff > delay) {
        color = ui.color.red;
        text = "Outdated";
    }
    else if (diff > delay / 2) {
        color = ui.color.yellow;
        text = "Old";
    }
    return {
        type: "flex",
        spacing: 8,
        crossAxisAlignment: "center",
        children: [
            {
                type: "text",
                value: text,
                style: {
                    color,
                    fontSize: size,
                },
            },
            {
                type: "icon",
                value: "circle",
                size,
                color,
            },
        ]
    };
}

module.exports = {
    updateStatus
}