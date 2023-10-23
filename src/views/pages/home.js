'use strict'

import { View, Flex, Container, padding } from "@lenra/components";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function content(_data, { state }) {
    console.log("state", state);
    return Flex(
        View("platform_list")
            .find(Post, {})
            .props({ add: true }),
        Container(
            View("post_list")
                .find(Post, {})
                .props({
                    limit: state.limit,
                    pagination
                })
        ).padding(padding.symmetric(32))
    )
        .direction("vertical")
        .spacing(32)
        .padding({
            top: 16,
            bottom: 32
        })
        .crossAxisAlignment("center");
}

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function menu(_data, _props) {
    return View("menu")
        .props({
            mainAction: {
                text: "New post",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "edit_post"
                    }
                }
            }
        });
}
