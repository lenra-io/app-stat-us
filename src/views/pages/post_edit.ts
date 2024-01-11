'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding, Container, Text, Form, TextField, DropdownButton, MenuItem, Menu } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';
import FormState from "../../classes/FormState.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: Post[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const platforms = props.data?.['guards.platform'] ?? []
    const platform = platforms[0]
    const posts = data.length > 0 ? data : props.data?.['guards.post'] ?? []
    const post = posts[0]
    const formStates = props.data?.['guards.formState'] ?? []
    let formState = formStates[0]
    const action = props.action as string ?? 'edit';

    if (formState?._slug != (post?.slug ?? ''))
        formState = undefined

    if (action === 'edit' && post == undefined) {
        return ViewLayout(Flex([
            Container(
                Text('Error 404: Post not found.')
                    .style({
                        fontSize: 32
                    })
            )
        ]).direction('vertical').crossAxisAlignment("center"), {
            actions: [
                Button("Back")
                    .mainStyle("secondary")
                    .onPressed("@lenra:navTo", {
                        path: `/${platform.slug}`
                    })
            ]
        })
    }


    const currentType = formState?.type ? Post.types.find(type => type.name == formState?.type) : Post.types.find(type => type.name == post?.type)
    return Form(
        ViewLayout(
            Container(Flex([
                Text(platform.name ?? 'New Post'),
                TextField(post?.name ?? '').style({
                    decoration: {
                        labelText: 'Post name'
                    }
                }).name('color'),
                DropdownButton(currentType?.displayName ?? 'Select a type', Menu(
                    Post.types.map(type =>
                        MenuItem(type.displayName)
                            .isSelected(type.name == currentType?.name)
                            .onPressed('setFormState', {
                                slug: post?.slug ?? '',
                                property: 'type',
                                value: type.name
                            })
                    )
                )),
                TextField(platform?.account ?? '').style({
                    decoration: {
                        labelText: 'Platform account name'
                    }
                }).name('account'),
            ])
                .spacing(16)
                .padding(padding.all(32))
                .mainAxisAlignment("start")
                .crossAxisAlignment("stretch")
                .direction("vertical"))
                .maxWidth(600),
            {
                actions: [
                    Button("Back")
                    .mainStyle("secondary")
                    .onPressed("@lenra:navTo", {
                        path: `/${platform.slug}`
                    }),
                    Button("Save").submit(true).onPressed("@lenra:navTo", {
                        path: `/${platform.slug}`
                    })
                ]
            })
    ).onSubmit(action == 'edit' ? 'onPlatformUpdate' : 'onPlatformCreate', { platform })
}
