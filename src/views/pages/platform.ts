'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding, Container, Text } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function platform(data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) {
    const users = props.data?.['guards.userIsRegistered'] ?? []
    const user = users[0]
    const platforms = data.length as number > 0 ? data : props.data?.['guards.platform'] ?? []
    const platform = platforms[0]

    return ViewLayout(Container(Flex([
        Flex([
            Flexible(
                View("components.platform_title")
                    .find(Platform, {
                        _id: props.platform
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
                    path: `/${platform.slug}/edit`
                })
            ])
            .spacing(16)
            .crossAxisAlignment("center"),
        View("components.url")
            .find(Platform, {
                _id: platform._id
            }),
        View("components.post_list")
            .find(Post, {
                platform: platform._id
            })
            .props({
                // add: true,
                limit: props.limit,
                pagination: props.pagination,
                platform: platform,
                user: user
            })
        ])
        .spacing(16)
        .padding(padding.all(32))
        .crossAxisAlignment("stretch")
        .direction("vertical")
    ).maxWidth(900),
{
        actions: [
            Button("Back")
            .mainStyle("secondary")
            .onPressed("@lenra:navTo", {
                path: `/`
            }),
            Button("New post").onPressed("@lenra:navTo", {
                path: `/${platform.slug}/new`
            })
        ]
    });
}
