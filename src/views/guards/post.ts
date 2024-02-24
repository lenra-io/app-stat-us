'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"
import Post from "../../classes/Post.js";
import Platform from "../../classes/Platform.js";
import Org from "../../classes/Org.js";

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const org = props?.data?.['guards.org']?.[0] as Org
    const platforms = (data as unknown as Platform[]).filter(platform => platform.org == org._id)
    const [post] = (data as unknown as Post[]).filter(post=>platforms.some(platform=>post.platform == platform._id))

    const platform = props.data?.['guards.platform']?.[0]

    if (!post) {
        return ViewLayout(Flex([
            Container(
                Text('Error 404: Post not found...')
                    .style({
                        fontSize: 32
                    })
            )
        ]).direction('vertical').crossAxisAlignment("center"), {
            actions: [
                Button("Back")
                    .mainStyle("secondary")
                    .onPressed("@lenra:navTo", {
                        path: platform.slug ? `/${platform.slug}` : '/'
                    })
            ]
        })
    }
    return guards(data, { guardname: 'guards.post', ...props }, context)
}
