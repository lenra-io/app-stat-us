'use strict'

import { View, TextField, Button, Form, Flex, padding } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import { fields } from "../../classes/PostStat.js";
import { defaultMenu } from "../components/menu.js";

/**
 * @param {*} _data
 * @param {{state: {platform: string, post: string}}} props
 * @returns
 */
export function newPostStats(_data, props) {
    return View("new_post_stats_form")
        .data(Platform, {
            _id: props.state.platform,
        });
}

/**
 *
 * @param {Platform[]} param0 The posts to edit
 * @param {*} _props
 * @returns
 */
export function form([platform], _props) {
    const date = new Date();
    const str = date.toISOString();
    const dateStr = str.substring(0, 10);
    const timeStr = str.substring(11, 19);
    return Form(
        Flex(
            ...fields
                .filter(field => platform[field.name])
                .map((field, i) =>
                    TextField("")
                        .name(field.name)
                        .autofocus(i == 0)
                        .style({
                            decoration: {
                                labelText: field.displayName,
                                icon: {
                                    type: "icon",
                                    value: field.icon,
                                }
                            },
                        })
                ),
            TextField(dateStr)
                .name("date")
                .style({
                    decoration: {
                        labelText: "Post date",
                        helperText: "Format: yyyy-mm-dd",
                        icon: {
                            type: "icon",
                            value: "calendar_today"
                        }
                    },
                }),
            TextField(timeStr)
                .name("time")
                .style({
                    decoration: {
                        labelText: "Post time",
                        helperText: "At UTC with the next format: hh:mm:ss",
                        icon: {
                            type: "icon",
                            value: "access_time"
                        }
                    },
                }),
            Button("Save").submit(true)
        )
            .spacing(16)
            .padding(padding.all(32))
            .crossAxisAlignment("stretch")
            .direction("vertical")
    ).onSubmit("savePostStat");
}

export const menu = defaultMenu;
