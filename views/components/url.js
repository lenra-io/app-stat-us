const { colors, Flex, Flexible, Icon, Text } = require("@lenra/components");

/**
 * @param {Document[]} docs
 * @param {*} props 
 * @returns 
 */
function url([doc], props) {
    return Flex(
        Icon("link").size(16),
        Flexible(
            Text(doc.url)
                .style({
                    color: colors.LenraColors.bluePulse,
                })
        )
    )
        .spacing(8)
        .crossAxisAlignment("center")
}

module.exports = {
    url
}