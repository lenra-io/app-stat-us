const Platform = require('../../classes/Platform.js');
const ui = require('../utils/ui.js')

const defaultBoxShadow = {
    blurRadius: 10,
    offset: {
        dx: 2,
        dy: 2
    },
    color: ui.color.opacity(ui.color.black, 0.7)
};

function platform_list(platforms, props) {
    let children = platforms.map(platform => {
        return {
            type: "view",
            name: "platform_card",
            coll: Platform.collection,
            query: {
                _id: platform._id
            }
        }
    });
    if (props && props.add) children.push(card("+", ui.color.grey, {}, {
        action: "pushState",
        props: {
            page: "edit_platform"
        }
    }));
    return {
        type: "flex",
        spacing: 16,
        mainAxisAlignment: "center",
        padding: ui.padding.all(16),
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
    const current = platforms.find(p => p._id==props.platform)
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
    return card(platform.name, platform.color, props, props.onPressed || {
        action: "pushState",
        props: {
            page: "platform",
            platform: platform._id
        }
    });
}

function platform_title([platform], props) {
    const onPressed = "onPressed" in props ? props.onPressed : {
        action: "pushState",
        props: {
            page: "platform",
            platform: platform._id
        }
    }
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
                    size: props.size || 24,
                    boxShadow: {},

                }
            }, {
                type: "text",
                value: platform.name
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
    const size = style.size || 64;
    const boxShadow = "boxShadow" in style ? style.boxShadow : defaultBoxShadow;
    const textColor = ui.color.betterContrast(color);
    let child = {
        type: "container",
        alignment: "center",
        constraints: ui.constraints.all(size),
        decoration: {
            color,
            borderRadius: ui.borderRadius.all(size / 8),
            boxShadow,
        },
        child: {
            type: "text",
            style: {
                color: textColor,
                fontWeight: "bold",
                fontSize: size / 2
            },
            value: name.substring(0, 1)
        }
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

module.exports = {
    platform_list,
    platform_selector,
    platform_card,
    platform_title,
}