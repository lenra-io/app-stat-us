import { colors, padding, borderRadius, Container, Text, Actionable, Flex, View, MenuItem, Menu, DropdownButton } from '@lenra/app';
import { collection } from '../../classes/Platform.js';
import { homeNavigation } from '../../services/navigationService.js';

const defaultBoxShadow = {
    blurRadius: 10,
    offset: {
        dx: 2,
        dy: 2
    },
    color: colors.opacity(colors.Colors.black, 0.7)
};

/**
 *
 * @param {Platform[]} platforms
 * @param {*} props
 * @returns
 */
export function platform_list(platforms, props) {
    const flex = Flex(
        ...platforms.map(platform => {
            const children = [
                View("platform_card")
                    .data(collection, {
                        _id: platform._id
                    })
                ,
                //     View("updateStatus")
                //         .data(PlatformStat.collection, {
                //             post: platform._id
                //         }),
                Container(
                    Text(platform.name)
                        .textAlign("center")
                ).padding({ top: 16 })
            ];
            if (platform.account) {
                children.push(
                    Text(`@${platform.account}`)
                        .textAlign("center")
                        .style({
                            fontSize: 12,
                        })
                );
            }
            return Container(
                Flex(...children)
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
    if (props && props.add) flex.addChild(
        card("+", 0xFFDCDCDC, {}, {
            action: "pushState",
            props: {
                page: "edit_platform"
            }
        })
    );
    return flex;
}

/**
 *
 * @param {Platform[]} platforms
 * @param {*} props
 * @returns
 */
export function platform_selector(platforms, props) {
    const current = platforms.find(p => p._id == props.platform)
    return DropdownButton(
        current ? platformName(current) : "Select a platform",
        Menu(
            ...platforms.map(platform =>
                MenuItem(platformName(platform))
                    .isSelected(platform == current)
                    .onPressed("setStateProperty", {
                        property: "platform",
                        value: platform._id,
                    })
            )
        ).toJSON()
    );
}

/**
 * @param {Platform} platform
 */
function platformName(platform) {
    if (platform.account) return `${platform.name} - ${platform.account}`;
    return platform.name;
}

/**
 *
 * @param {Platform[]} param0
 * @param {*} props
 * @returns
 */
export function platform_card([platform], props) {
    const onPressed = "onPressed" in props ? props.onPressed : navigateToPlatformListener(platform._id);
    return card(platform.name, platform.color, props, onPressed);
}

export function platform_title([platform], props) {
    const onPressed = "onPressed" in props ? props.onPressed : navigateToPlatformListener(platform._id);
    const size = props.size || 24;
    let child = Flex(
        View("platform_card")
            .data(collection, {
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
    )
        .spacing(8)
        .padding(props.padding);
    if (onPressed) {
        child = {
            type: "actionable",
            child,
            onPressed
        };
    }
    return child;
}

function card(name, color, style, onPressed) {
    if (!color) color = 0xFFAAAAAA;
    const size = style.size || 64;
    const boxShadow = "boxShadow" in style ? style.boxShadow : defaultBoxShadow;
    const textColor = color ? colors.betterContrast(color) : 0xFF000000;
    let child = Container(
        Text(name.substring(0, 1))
            .style({
                color: textColor,
                fontWeight: "bold",
                fontSize: size / 2
            })
    )
        .width(size)
        .height(size)
        .alignment("center")
        .color(color)
        .borderRadius(borderRadius.all(size / 8))
        .boxShadow(boxShadow);
    if (onPressed) {
        child = Actionable(child)
            .onPressed(onPressed.action, onPressed.props);
    }
    return child;
}

function navigateToPlatformListener(platformId) {
    return {
        action: "replaceNavigation",
        props: platformNavigation(platformId),
    }
}

export function platformNavigation(platformId) {
    // Deep copy
    const navigation = JSON.parse(JSON.stringify(homeNavigation));
    navigation.history.push(navigation.state);
    navigation.state = {
        page: "platform",
        platform: platformId
    }
    return navigation;
}
