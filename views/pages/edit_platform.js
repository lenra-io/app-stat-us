'use strict'

const Platform = require("../../classes/Platform");
const PostStat = require("../../classes/PostStat");
const { firstProperty } = require("../utils/data");
const ui = require("../utils/ui");

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, props) {
    const child = {
        type: "view",
        name: 'edit_platform_form',
        props
    };
    if (props.state.platform) {
        child.coll = Platform.collection;
        child.query = {
            _id: props.state.platform
        };
    }
    return child;
}

/**
 * 
 * @param {Platform[]} param0 The platforms to edit
 * @param {{state: any}} param1 
 * @returns 
 */
function form([platform], { state }) {
    let colorHex = state?.colorHex || ui.color.toHex(platform?.color);
    let color = ui.color.fromHex(colorHex);
    const action = platform ? "updatePlatform" : "setStateProperty";
    const children = [
        // {
        //     type: "textfield",
        //     value: firstProperty("name", "", state, platform),
        //     autofocus: true,
        //     style: {
        //         decoration: {
        //             labelText: "Platform name"
        //         },
        //     },
        //     onChanged: {
        //         action,
        //         props: {
        //             property: "name"
        //         }
        //     }
        // },
        // {
        //     type: "textfield",
        //     value: colorHex || "",
        //     style: {
        //         decoration: {
        //             labelText: "Color",
        //             filled: !!(color),
        //             fillColor: color,
        //             helperText: "Hex format: #FF0000 for red",
        //         },
        //     },
        //     onChanged: {
        //         action,
        //         props: {
        //             property: "colorHex"
        //         }
        //     }
        // },
        // {
        //     type: "textfield",
        //     value: firstProperty("url", "", state, platform),
        //     style: {
        //         decoration: {
        //             labelText: "Page URL",
        //             helperText: "Full url: https://www.lenra.io"
        //         },
        //     },
        //     onChanged: {
        //         action,
        //         props: {
        //             property: "url"
        //         }
        //     }
        // },
        // {
        //     type: "textfield",
        //     value: firstProperty("account", "", state, platform),
        //     style: {
        //         decoration: {
        //             labelText: "Platform account name",
        //             helperText: "if needed"
        //         },
        //     },
        //     onChanged: {
        //         action,
        //         props: {
        //             property: "account"
        //         }
        //     }
        // },
        ...PostStat.fields
            .map(property => booleanField(property, state, platform)),
    ];
    if (!platform) {
        children.push({
            type: "button",
            text: "Save",
            onPressed: {
                action: "savePlatform"
            }
        });
    }
    return {
        type: "flex",
        spacing: 16,
        mainAxisAlignment: "start",
        crossAxisAlignment: "stretch",
        direction: "vertical",
        children
    }
}

function booleanField(property, state, platform) {
    const action = platform ? "updatePlatform" : "setStateProperty";
    return {
        type: "flex",
        spacing: 16,
        crossAxisAlignment: "center",
        children: [
            {
                type: "icon",
                value: property.icon,
            },
            {
                type: "flexible",
                child: {
                    type: "text",
                    value: property.displayName
                }
            },
            {
                type: "toggle",
                value: firstProperty(property.name, false, state, platform),
                onPressed: {
                    action,
                    props: {
                        property: property.name
                    }
                }
            },
        ]
    }
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, { state }) {
    return {
        type: "view",
        name: "menu",
    }
}

module.exports = {
    content,
    menu,
    form,
}
