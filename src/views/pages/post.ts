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
export function post(data: Post[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const platform = props.data?.['guards.platform']?.[0] as Platform
    const post = data[0] ?? props.data?.['guards.post']?.[0] as Post

    return ViewLayout(Flex([
            Flex([
                Flexible(
                    View("components.platform_title")
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
                    .onPressed("@lenra:navTo", {
                        path: `/${platform.slug}/${post.slug}/edit`
                    })
                ])
                .spacing(16)
                .crossAxisAlignment("center"),
            // View("components.post_infos")
            //     .find(Post, {
            //         _id: post._id
            //     }),
            View("components.post_stats")
                .find(PostStat, {
                    post: post._id,
                }).props({
                    post,
                    platform
                })
        ])
            .spacing(32)
            .padding(padding.all(32))
            .crossAxisAlignment("stretch")
            .direction("vertical"),
{
        actions: [
            Button("Back")
            .mainStyle("secondary")
            .onPressed("@lenra:navTo", {
                path: platform ? `/${platform.slug}` : `/`
            }),
            Button("Add Stat").onPressed("@lenra:navTo", {
                path: `/${platform.slug}/${post.slug}/new`
            })
        ]
    });
}
