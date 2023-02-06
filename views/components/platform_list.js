const { colors, padding, borderRadius, Container } = require('@lenra/components');
const Platform = require('../../classes/Platform.js');
const { homeNavigation } = require('../../services/navigationService.js');

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
function platform_list(platforms, props) {
    let children = platforms.map(platform => {
        const children = [
            {
                type: "view",
                name: "platform_card",
                coll: Platform.collection,
                query: {
                    _id: platform._id
                }
            },
            {
                type: "container",
                padding: { top: 16 },
                child: {
                    type: "text",
                    value: platform.name,
                    textAlign: "center",
                },
            },
        ];
        if (platform.account) {
            children.push({
                type: "text",
                value: `@${platform.account}`,
                textAlign: "center",
                style: {
                    fontSize: 12,
                }
            });
        }
        // {
        //     type: "view",
        //     name: "updateStatus",
        //     coll: PostStat.collection,
        //     query: {
        //         post: post._id
        //     },
        //     props: {
        //         date: post.date,
        //     }
        // }
        return {
            type: "container",
            constraints: { maxWidth: 64 },
            child: {
                type: "flex",
                mainAxisAlignment: "start",
                crossAxisAlignment: "stretch",
                direction: "vertical",
                children
            }
        };
    });
    if (props && props.add) children.push(card("+", 0xFFAAAAAA, {}, {
        action: "pushState",
        props: {
            page: "edit_platform"
        }
    }));
    return {
        type: "flex",
        spacing: 24,
        mainAxisAlignment: "center",
        padding: padding.all(16),
        fillParent: true,
        scroll: true,
        children
    }
}

/**
 * 
 * @param {Platform[]} platforms 
 * @param {*} props 
 * @returns 
 */
function platform_selector(platforms, props) {
    const current = platforms.find(p => p._id == props.platform)
    let children = platforms.map(platform => {
        return {
            type: "menuItem",
            text: platformName(platform),
            // icon: {
            //     type: "view",
            //     name: "platform_card",
            //     coll: Platform.collection,
            //     query: {
            //         _id: platform._id
            //     }
            // },
            isSelected: platform == current,
            onPressed: {
                action: "setStateProperty",
                props: {
                    property: "platform",
                    value: platform._id,
                }
            }
        }
    });
    const child = {
        type: "menu",
        children
    };
    return {
        type: "dropdownButton",
        text: current ? platformName(current) : "Select a platform",
        child,
    };
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
function platform_card([platform], props) {
    const onPressed = "onPressed" in props ? props.onPressed : navigateToPlatformListener(platform._id);
    return card(platform.name, platform.color, props, onPressed);
}

function platform_title([platform], props) {
    const onPressed = "onPressed" in props ? props.onPressed : navigateToPlatformListener(platform._id);
    const size = props.size || 24;
    let child = {
        type: "flex",
        spacing: 8,
        padding: props.padding,
        children: [
            {
                type: "view",
                name: "platform_card",
                coll: Platform.collection,
                query: {
                    _id: platform._id
                },
                props: {
                    size,
                    boxShadow: {},
                    onPressed: null,
                }
            }, {
                type: "text",
                value: platform.name,
                style: {
                    fontWeight: props.fontWeight,
                    fontSize: size * 2 / 3,
                }
            }
        ]
    };
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
    let child = Container.new(
        {
            type: "text",
            style: {
                color: textColor,
                fontWeight: "bold",
                fontSize: size / 2
            },
            value: name.substring(0, 1)
        }
    )
        .width(size)
        .height(size)
        .alignment("center")
        .color(color)
        .borderRadius(borderRadius.all(size / 8))
        .boxShadow(boxShadow);
    if (onPressed) {
        child = {
            type: "actionable",
            child,
            onPressed
        };
    }
    return child;
}

function navigateToPlatformListener(platformId) {
    return {
        action: "replaceNavigation",
        props: platformNavigation(platformId),
    }
}

function platformNavigation(platformId) {
    // Deep copy
    const navigation = JSON.parse(JSON.stringify(homeNavigation));
    navigation.history.push(navigation.state);
    navigation.state = {
        page: "platform",
        platform: platformId
    }
    return navigation;
}

module.exports = {
    platform_list,
    platform_selector,
    platform_card,
    platform_title,
    platformNavigation,
}