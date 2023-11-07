'use strict'

import { View, Flex, Container, padding } from "@lenra/components";
import Platform from "../../classes/Platform";
import Post from "../../classes/Post";

const pagination = 5;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    console.log("state", state);
    return Flex(
        View("platform_list")
            .coll(Platform.collection)
            .props({ add: true }),
        Container(
            View("post_list")
                .coll(Post.collection)
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
function menu(_data, _props) {
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

module.exports = {
    content,
    menu,
}