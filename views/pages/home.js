'use strict'

const { View, Flex } = require("@lenra/components");
const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");

const pagination = 5;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    console.log("state", state);
    return Flex.new(
        View.new("platform_list")
            .coll(Platform.collection)
            .props({ add: true }),
        View.new("post_list")
            .coll(Post.collection)
            .props({
                limit: state.limit,
                pagination
            }),
    )
        .direction("vertical")
        .spacing(32)
        .crossAxisAlignment("center");
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, _props) {
    return View.new("menu")
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