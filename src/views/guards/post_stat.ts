'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"
import Post from "../../classes/Post.js";
import PostStat from "../../classes/PostStat.js";
import Platform from "../../classes/Platform.js";

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const [post_stat] = data as unknown as PostStat[]
    const platform = props.data?.['guards.platform']?.[0] as Platform
    const post = props.data?.['guards.post']?.[0] as Post

    if (!post_stat) {
        return ViewLayout(Flex([
            Container(
                Text('Error 404: Stat not found...')
                    .style({
                        fontSize: 32
                    })
            )
        ]).direction('vertical').crossAxisAlignment("center"), {
            actions: [
                Button("Back")
                    .mainStyle("secondary")
                    .onPressed("@lenra:navTo", {
                        path: post.slug ? `/${platform.slug}/${post.slug}` : platform.slug ? `/${platform.slug}` : '/'
                    })
            ]
        })
    }
    return guards(data, { guardname: 'guards.post_stat', ...props }, context)
}
