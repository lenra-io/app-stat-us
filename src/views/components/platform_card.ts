import { ViewRequest, Component, IComponent, Container, Text, borderRadius, Actionable, colors } from "@lenra/app"
import Platform from "../../classes/Platform.js";

const boxShadow = {
    blurRadius: 10,
    offset: {
        dx: 2,
        dy: 2
    },
    color: colors.opacity(colors.Colors.black, 0.7)
};

export default function([platform]: Platform[], props: ViewRequest['props']): Component<IComponent> | IComponent {
    const color = props.color as number ?? 0xFFAAAAAA;
    const textColor = color ? colors.betterContrast(color) : 0xFF000000;
    return Actionable(Container(
        Text(platform.name.substring(0, 1))
            .style({
                color: textColor,
                fontWeight: "bold",
                fontSize: 32
            })
    )
        .width(64)
        .height(64)
        .alignment("center")
        .color(color)
        .borderRadius(borderRadius.all(8))
        .boxShadow(boxShadow))
        .onPressed("@lenra:navTo", {
            path: `/${platform.slug}`
        });
}
