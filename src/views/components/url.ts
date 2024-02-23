import { colors, Flex, Flexible, Icon, Text } from "@lenra/app";

/**
 * @param {Document[]} docs
 * @param {*} props
 * @returns
 */
export default function([doc], props) {
    return Flex([
        Icon("link").size(16),
        Flexible(
            Text(doc.url)
                .style({
                    color: colors.LenraColors.bluePulse,
                })
        )
    ])
        .spacing(8)
        .crossAxisAlignment("center")
}
