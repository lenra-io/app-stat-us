const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js')

const defaultBoxShadow = {
    blurRadius: 10,
    offset: {
        dx: 2,
        dy: 2
    },
    color: ui.color.opacity(ui.color.black, 0.7)
};

function platform_list(data, props) {
    let platforms = [
        {}
    ];
    let children = platforms.map(platform => {
        return {
            type: "view",
            name: "platform_card",
            // coll: navigationService.collection,
            // query: {
            //     user: platform._id
            // }
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
        mainAxisAlignment: "start",
        scroll: true,
        children
    }
}

function platform_card(data, props) {
    return card("Twitter", ui.color.blue, props, props.onPressed || {
        action: "pushState",
        props: {
            page: "platform",
            // platform: platform._id
        }
    });
}

function platform_title(data, props) {
    let platform = {
        name: "Twitter"
    }
    console.log(props);
    const onPressed = "onPressed" in props ? props.onPressed || undefined : {
        action: "pushState",
        props: {
            page: "platform",
            // platform: platform._id
        }
    }
    return {
        type: "actionable",
        child: {
            type: "flex",
            spacing: 16,
            children: [
                {
                    "type": "view",
                    "name": "platform_card",
                    props: {
                        size: props.size || 24,
                        boxShadow: {},

                    }
                }, {
                    type: "text",
                    style: {
                        fontSize: 16
                    },
                    value: platform.name
                }
            ]
        },
        onPressed
    };
}

function card(name, color, style, onPressed) {
    const size = style.size || 64;
    const boxShadow = "boxShadow" in style ? style.boxShadow : defaultBoxShadow;
    return {
        type: "actionable",
        child: {
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
                    fontWeight: "bold",
                    fontSize: size / 2
                },
                value: name.substring(0, 1)
            }
        },
        onPressed
    };
}

module.exports = {
    platform_list,
    platform_card,
    platform_title,
}