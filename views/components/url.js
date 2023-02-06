const { colors } = require("@lenra/components");

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
                    color: colors.LenraColors.bluePulse,
                },
                value: doc.url
            },
        ]
    };
}

module.exports = {
    url
}