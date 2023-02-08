const { colors, Text, Icon, Flex } = require("@lenra/components");
const { LenraColors } = colors;

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
    let color = LenraColors.greenPulse;
    let text = "Up to date";
    if (diff > delay) {
        color = LenraColors.redPulse;
        text = "Outdated";
    }
    else if (diff > delay / 2) {
        color = LenraColors.yellowPulse;
        text = "Old";
    }
    return Flex(
        Text(text)
            .style({
                color,
                fontSize: size,
            }),
        Icon("circle")
            .size(size)
            .color(color)
    )
        .spacing(8)
        .crossAxisAlignment("center");
}

module.exports = {
    updateStatus
}