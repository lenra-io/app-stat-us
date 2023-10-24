'use strict'

import { View, Flex, Flexible, Button, Text, padding } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import PostStat from "../../classes/PostStat.js";
import { url } from "../components/url.js";

const pagination = 10;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function post(_data, { state }) {
    return Flex(
        Flex(
            Flexible(
                View("platform_title")
                    .data(Platform, {
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
            .data(Post, {
                _id: state.post
            }),
        View("post_stats")
            .data(PostStat, {
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
export function infos([post], props) {
    let name = post.name;
    if (post.channel) name = `${post.channel} - ${name}`;
    return Flex(
        Text(name)
            .style({
                fontSize: 24,
                fontWeight: "bold",
            }),
        Text(`type: ${types.find(type => type.name == post.type)?.displayName || "Not defined"}`),
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
export function postMenu(_data, { state }) {
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
