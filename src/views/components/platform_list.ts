import { Actionable, ViewRequest, Component, Flex, IComponent, View, Container, padding, Text, colors, borderRadius, Icon } from "@lenra/app"
import Platform from "../../classes/Platform.js";
import { LenraComponent } from "@lenra/app/dist/lib/gen/response.js";

export default function (platforms: Platform[], _props: ViewRequest['props'], _context: ViewRequest['context']): Component<IComponent> | IComponent {
    // Show create a platform button if there is nothing in the list
    if (platforms?.length == 0) {
        return Flex([
            Container(
                Flex([
                    Text('Nothing here! Create a new platform :')
                        .style({
                            fontSize: 32
                        }),
                    Container().height(10),
                    Actionable(Container(
                            Icon('add').color(0xFFFFFFFF)
                    )
                        .width(64)
                        .height(64)
                        .alignment("center")
                        .color(0xFF1272FD)
                        .borderRadius(borderRadius.all(8))
                        .boxShadow({
                            blurRadius: 10,
                            offset: {
                                dx: 2,
                                dy: 2
                            },
                            color: colors.opacity(colors.Colors.black, 0.7)
                        }))
                        .onPressed("@lenra:navTo", {
                            path: `/new`
                        })
                ]).direction("vertical")
                .crossAxisAlignment("center")
            )
        ])
    }

    // Show platform list
    return Flex(
        platforms.map(platform => {
            return Container(
                Flex([
                    View("components.platform_card")
                        .find(Platform, {
                            _id: platform._id
                        }),
                    Container(
                        Text(platform.name)
                            .textAlign("center")
                    ).padding({ top: 16 }),
                    ...(platform.account ? [Text(`@${platform.account}`)
                        .textAlign("center")
                        .style({
                            fontSize: 12,
                        })] : [])
                ])
                    .direction("vertical")
                    .crossAxisAlignment("stretch")
            ).maxWidth(64);
        })
    )
        .spacing(24)
        .mainAxisAlignment("center")
        .padding(padding.symmetric(32, 16))
        .fillParent(true)
        .scroll(true)
}
