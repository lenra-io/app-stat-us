import { colors, Flex, Flexible, Icon, Text } from "@lenra/components";

/**
 * @param {Document[]} docs
 * @param {*} props
 * @returns
 */
export function url([doc], props) {
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
