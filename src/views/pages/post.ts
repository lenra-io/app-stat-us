'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';
import PostStat from "../../classes/PostStat.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function post([post]: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) {

    return ViewLayout(Flex([
            Flex([
                Flexible(
                    View("platform_title")
                        .find(Platform, {
                            _id: post.platform
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
                        post: post._id,
                        platform: post.platform
                    })
                ])
                .spacing(16)
                .crossAxisAlignment("center"),
            View("post_infos")
                .find(Post, {
                    _id: post._id
                }),
            View("post_stats")
                .find(PostStat, {
                    post: post._id,
                })
        ])
            .spacing(32)
            .padding(padding.all(32))
            .crossAxisAlignment("stretch")
            .direction("vertical"),
{
        actions: [
            Button("New post").onPressed("@lenra:navTo", {
                path: `/${props.platform}/new_post`
            })
        ]
    });
}
