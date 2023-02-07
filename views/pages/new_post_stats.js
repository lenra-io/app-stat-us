'use strict'

const { View, TextField, Button, Form, Flex } = require("@lenra/components");
const Platform = require("../../classes/Platform");
const PostStat = require("../../classes/PostStat");
const { defaultMenu } = require("../components/menu");

/**
 * @param {*} _data 
 * @param {{state: {platform: string, post: string}}} props 
 * @returns 
 */
function content(_data, props) {
    return View.new("new_post_stats_form")
        .data(Platform.collection, {
            _id: props.state.platform,
        });
}

/**
 * 
 * @param {Platform[]} param0 The posts to edit
 * @param {*} _props 
 * @returns 
 */
function form([platform], _props) {
    const date = new Date();
    const str = date.toISOString();
    const dateStr = str.substring(0, 10);
    const timeStr = str.substring(11, 19);
    return Form.new(
        Flex.new(
            ...PostStat.fields
                .filter(field => platform[field.name])
                .map((field, i) =>
                    TextField.new("")
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
            TextField.new(dateStr)
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
            TextField.new(timeStr)
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
            Button.new("Save").submit(true)
        )
            .spacing(16)
            .crossAxisAlignment("stretch")
            .direction("vertical")
    ).onSubmit("savePostStat");
}

module.exports = {
    content,
    form,
    menu: defaultMenu,
}
