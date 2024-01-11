import { Flex, View, Text } from "@lenra/app";
import Platform from "../../classes/Platform";

export default function([platform], props) {
    const size = props.size || 24;
    return Flex(
        [
            View("components.platform_card")
                .find(Platform, {
                    _id: platform._id
                })

                .props({
                    size,
                    boxShadow: {},
                    onPressed: null,
                }),
            Text(platform.name)
                .style({
                    fontWeight: props.fontWeight,
                    fontSize: size * 2 / 3,
                })
        ]
    )
        .spacing(8)
        .padding(props.padding);
}
