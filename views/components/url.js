const { colors, Flex, Icon, Text } = require("@lenra/components");

/**
 * @param {Document[]} docs
 * @param {*} props 
 * @returns 
 */
function url([doc], props) {
    return Flex.new(
        Icon.new("link").size(16),
        Text.new(doc.url)
            .style({
                color: colors.LenraColors.bluePulse,
            })
    )
        .spacing(8)
        .crossAxisAlignment("center")
}

module.exports = {
    url
}