'use strict'

const platformService = require('../../services/platformService.js');
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
        child.coll = platformService.collection;
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
    return {
        type: "container",
        constraints: { maxWidth: 600 },
        child: {
            type: "flex",
            spacing: 16,
            mainAxisAlignment: "start",
            crossAxisAlignment: "stretch",
            direction: "vertical",
            children: [
                {
                    type: "textfield",
                    value: firstProperty("name", "", state, platform),
                    style: {
                        decoration: {
                            labelText: "Platform name"
                        },
                    },
                    onChanged: {
                        action: "setStateProperty",
                        props: {
                            property: "name"
                        }
                    }
                },
                {
                    type: "textfield",
                    value: colorHex || "",
                    style: {
                        decoration: {
                            labelText: "Color",
                            filled: !!(color),
                            fillColor: color,
                        },
                    },
                    onChanged: {
                        action: "setStateProperty",
                        props: {
                            property: "colorHex"
                        }
                    }
                },
                {
                    type: "textfield",
                    value: firstProperty("url", "", state, platform),
                    style: {
                        decoration: {
                            labelText: "Page URL"
                        },
                    },
                    onChanged: {
                        action: "setStateProperty",
                        props: {
                            property: "url"
                        }
                    }
                },
                {
                    type: "textfield",
                    value: firstProperty("account", "", state, platform),
                    style: {
                        decoration: {
                            labelText: "Platform account name",
                            helperText: "if needed"
                        },
                    },
                    onChanged: {
                        action: "setStateProperty",
                        props: {
                            property: "account"
                        }
                    }
                },
                ...["views", "shared", "likes", "comments", "clics", "visits"]
                    .map(property => booleanField(property, state, platform)),
                {
                    type: "button",
                    text: "Save",
                    onPressed: {
                        action: "savePlatform"
                    }
                }
            ]
        }
    }
}

function booleanField(property, state, platform) {
    return {
        type: "flex",
        spacing: 16,
        crossAxisAlignment: "center",
        children: [
            {
                type: "flexible",
                child: {
                    type: "text",
                    value: `Manage ${property}`
                }
            },
            {
                type: "toggle",
                value: firstProperty(property, false, state, platform),
                onPressed: {
                    action: "setStateProperty",
                    props: {
                        property
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
        props: {
            mainAction: {
                text: "Save",
                onPressed: {
                    action: "savePlatform"
                }
            }
        }
    }
}

module.exports = {
    content,
    menu,
    form,
}
