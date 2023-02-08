'use strict'

const { View, Button, Flexible, Flex, padding } = require("@lenra/components");
const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");

const pagination = 5;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return Flex(
        Flex(
            Flexible(
                View("platform_title")
                    .data(Platform.collection, {
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
            .data(Platform.collection, {
                _id: state.platform
            }),
        View("post_list")
            .data(Post.collection, {
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
function menu(_data, { state }) {
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

module.exports = {
    content,
    menu,
}
