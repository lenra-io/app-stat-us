'use strict'

import { View, colors, Flex, TextField, Button, Icon, Flexible, Text, Toggle, padding } from "@lenra/components";
import { collection } from "../../classes/Platform.js";
import { fields } from "../../classes/PostStat.js";
import { defaultMenu } from "../components/menu.js";
import { firstProperty } from "../utils/data.js";

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function content(_data, props) {
    const child = View('edit_platform_form').props(props);
    if (props.state.platform) {
        child.data(collection, {
            _id: props.state.platform
        });
    }
    return child;
}

/**
 *
 * @param {Platform[]} param0 The platforms to edit
 * @param {{state: any}} param1
 * @returns
 */
export function form([platform], { state }) {
    const colorHex = state?.colorHex || colors.toHex(platform?.color);
    const color = colors.fromHex(colorHex);
    const textColor = color ? colors.betterContrast(color) : undefined;
    const action = platform ? "updatePlatform" : "setStateProperty";
    const flex = Flex(
        TextField(firstProperty("name", "", state, platform))
            .autofocus(true)
            .style({
                decoration: {
                    labelText: "Platform name"
                },
            })
            .onChanged(action, { property: "name" }),
        TextField(colorHex || "")
            .style({
                textStyle: {
                    color: textColor,
                },
                decoration: {
                    labelText: "Color",
                    filled: !!(color),
                    fillColor: color,
                    helperText: "Hex format: #FF0000 for red",
                },
            })
            .onChanged(action, { property: "colorHex" }),
        TextField(firstProperty("url", "", state, platform))
            .style({
                decoration: {
                    labelText: "Page URL",
                    helperText: "Full url: https://www.lenra.io"
                },
            })
            .onChanged(action, { property: "url" }),
        TextField(firstProperty("account", "", state, platform))
            .style({
                decoration: {
                    labelText: "Platform account name",
                    helperText: "if needed"
                },
            })
            .onChanged(action, { property: "account" }),
    )
        .spacing(16)
        .padding(padding.all(32))
        .mainAxisAlignment("start")
        .crossAxisAlignment("stretch")
        .direction("vertical");

    fields.forEach(property =>
        flex.addChild(
            Flex(
                Icon(property.icon),
                Flexible(
                    Text(property.displayName)
                ),
                Toggle(firstProperty(property.name, true, state, platform))
                    .onPressed(action, { property: property.name })
            )
                .spacing(16)
                .crossAxisAlignment("center")
        )
    );

    if (!platform) flex.addChild(Button("Save").onPressed("savePlatform"));
    return flex;
}

export const menu = defaultMenu;
