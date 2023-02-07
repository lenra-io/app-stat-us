'use strict'

const { View, Flex, Flexible, Button } = require("@lenra/components");
const Platform = require("../../classes/Platform");
const Post = require("../../classes/Post");
const PostStat = require("../../classes/PostStat");
const { url } = require("../components/url");

const pagination = 10;

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, { state }) {
    return Flex.new(
        Flex.new(
            Flexible.new(
                View.new("platform_title")
                    .data(Platform.collection, {
                        _id: state.platform
                    })
                    .props({
                        onPressed: null,
                        size: 32,
                        fontWeight: 'bold',
                    })
            ),
            Button.new("Edit")
                .mainStyle("secondary")
                .onPressed("pushState", {
                    page: "edit_post",
                    post: state.post,
                    platform: state.platform
                })
        )
            .spacing(16)
            .crossAxisAlignment("center"),
        View.new("post_infos")
            .data(Post.collection, {
                _id: state.post
            }),
        View.new("post_stats")
            .data(PostStat.collection, {
                post: state.post,
            })
            .props({
                limit: state.limit,
                pagination
            })
    )
        .spacing(32)
        .crossAxisAlignment("stretch")
        .direction("vertical")
}

/**
 * @param {Post[]} posts 
 * @param {*} props 
 * @returns 
 */
function infos([post], props) {
    let name = post.name;
    if (post.channel) name = `${post.channel} - ${name}`;
    return Flex.new(
        Text.new(name)
            .style({
                fontSize: 24,
                fontWeight: "bold",
            }),
        Text.new(`type: ${Post.types.find(type => type.name == post.type)?.displayName || "Not defined"}`),
        url([post], {}),
    )
        .spacing(16)
        .direction("vertical")
}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, { state }) {
    return View.new("menu")
        .props({
            mainAction: {
                text: "Add stats",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "new_post_stats",
                        post: state.post,
                        platform: state.platform,
                    }
                }
            }
        })
}

module.exports = {
    content,
    infos,
    menu,
}
