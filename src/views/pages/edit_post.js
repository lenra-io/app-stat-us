'use strict'

import { View, Form, Flex, TextField, MenuItem, DropdownButton, Menu, Icon, Button, padding } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import { defaultMenu } from "../components/menu.js";
import { firstProperty } from "../utils/data.js";

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function editPost(_data, props) {
    const child = View('edit_post_form')
        .props(props);
    if (props.state.post) {
        child.data(Post, { _id: props.state.post });
    }
    return child;
}

/**
 *
 * @param {Post[]} param0 The posts to edit
 * @param {{state: any}} param1
 * @returns
 */
export function editPostForm([post], { state }) {
    const date = post ? new Date(post.date) : new Date();
    const str = date.toISOString();
    const dateStr = state.date || str.substring(0, 10);
    const timeStr = state.time || str.substring(11, 19);
    return Form(
        Flex(
            View("platform_selector")
                .coll(Platform)
                .props({ platform: state.platform || post?.platform }),
            TextField(firstProperty("name", "", state, post))
                .name("name")
                .autofocus(true)
                .style({
                    decoration: {
                        labelText: "Post name"
                    },
                }),
            post_type_selector(state?.type || post?.type),
            TextField(firstProperty("channel", "", state, post))
                .name("channel")
                .style({
                    decoration: {
                        labelText: "Platform channel name",
                        helperText: "if needed"
                    },
                }),
            TextField(firstProperty("url", "", state, post))
                .name("url")
                .style({
                    decoration: {
                        labelText: "Post URL",
                        helperText: "Full url: https://www.lenra.io/my-post",
                        icon: Icon("insert_link").toJSON()
                    },
                }),
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
            Button("Save")
                .submit(true)
        )
            .spacing(16)
            .padding(padding.all(32))
            .mainAxisAlignment("start")
            .crossAxisAlignment("stretch")
            .direction("vertical")
    )
        .onSubmit("savePost");
}


function post_type_selector(type) {
    const current = types.find(t => t.name == type)
    return DropdownButton(
        current ? current.displayName : "Select a type",
        Menu(
            ...types.map(type => {
                return MenuItem(type.displayName)
                    .isSelected(type == current)
                    .onPressed("setStateProperty", {
                        property: "type",
                        value: type.name,
                    });
            })
        )
    );
}

export const editPostMenu = defaultMenu;
