'use strict'

import { View, Flex, Flexible, Button, Text, padding } from "@lenra/components";
import Platform from "../../classes/Platform";
import Post from "../../classes/Post";
import PostStat from "../../classes/PostStat";
import { url } from "../components/url";

const pagination = 10;

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
                    page: "edit_post",
                    post: state.post,
                    platform: state.platform
                })
        )
            .spacing(16)
            .crossAxisAlignment("center"),
        View("post_infos")
            .data(Post.collection, {
                _id: state.post
            }),
        View("post_stats")
            .data(PostStat.collection, {
                post: state.post,
            })
            .props({
                limit: state.limit,
                pagination
            })
    )
        .spacing(32)
        .padding(padding.all(32))
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
    return Flex(
        Text(name)
            .style({
                fontSize: 24,
                fontWeight: "bold",
            }),
        Text(`type: ${Post.types.find(type => type.name == post.type)?.displayName || "Not defined"}`),
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
    return View("menu")
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
