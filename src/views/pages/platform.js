'use strict'

import { View, Button, Flexible, Flex, padding } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function platform(_data, { state }) {
    return Flex(
        Flex(
            Flexible(
                View("platform_title")
                    .find(Platform, {
                        _id: state.platform
                    })
                    .props({
                        onPressed: null,
                        size: 32,
                        fontWeight: 'bold',
                    })
            ),
            Button("Edit")
                .mainStyle("secondary")
                .onPressed("pushState", {
                    page: "edit_platform",
                    platform: state.platform
                })
        )
            .spacing(16)
            .crossAxisAlignment("center"),
        View("url")
            .find(Platform, {
                _id: state.platform
            }),
        View("post_list")
            .find(Post, {
                platform: state.platform
            })
            .props({
                // add: true,
                limit: state.limit,
                pagination,
                platform: state.platform,
            })
    )
        .spacing(16)
        .padding(padding.all(32))
        .crossAxisAlignment("stretch")
        .direction("vertical")
}

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function platformMenu(_data, { state }) {
    return View("menu")
        .props({
            mainAction: {
                text: "New post",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "edit_post",
                        platform: state.platform
                    }
                }
            }
        });
}
