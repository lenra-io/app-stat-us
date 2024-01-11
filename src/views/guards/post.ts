'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const [post] = data
    const platformSlug = context?.pathParams['platform']
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
                        path: platformSlug ? `/${platformSlug}` : '/'
                    })
            ]
        })
    }
    return guards(data, { guardname: 'guards.post', ...props }, context)
}
