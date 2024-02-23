'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding, Container, Text, Form, TextField, DropdownButton, MenuItem, Menu, Icon } from "@lenra/app";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';
import User from "../../classes/User.js";
import Platform from "../../classes/Platform.js";
import { numberToDateAndTimeStr } from "../../utils/string.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: Post[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    const platform = props.data?.['guards.platform']?.[0] as Platform
    const post = data.length > 0 ? data[0] : props.data?.['guards.post']?.[0] as Post
    const action = props.action as string ?? 'edit';

    if (user.state?._slug != post?.slug)
        user.state = undefined

    let date: string[]
    if (post) {
        date = numberToDateAndTimeStr(post.date)
    }

    const currentType = user.state?.type ? Post.types.find(type => type.name == user.state?.type) : Post.types.find(type => type.name == post?.type)
    return Form(
        ViewLayout(
            Container(Flex([
                Text(platform.name ?? 'New Post').style({
                    fontSize: 32,
                    fontWeight: 'bold'
                }),
                TextField(post?.name ?? '').style({
                    decoration: {
                        labelText: 'Post name'
                    }
                }).name('name'),
                // Uncomment following when dropdown button issue with clic event will be fixed :
                // DropdownButton(currentType?.displayName ?? 'Select a type', Menu(
                //     Post.types.filter(t => t.name != currentType?.name).map(type =>
                //         MenuItem(type.displayName)
                //             .isSelected(type.name == currentType?.name)
                //             .onPressed('updateUser', {
                //                 id: '@me',
                //                 'state._slug': post?.slug,
                //                 'state.type': type.name
                //             })
                //     )
                // )),
                Menu(
                    Post.types.map(type =>
                        MenuItem(type.displayName)
                            .isSelected(type.name == currentType?.name)
                            .onPressed('updateUser', {
                                id: '@me',
                                'state._slug': post?.slug,
                                'state.type': type.name
                            })
                    )
                ),
                TextField(post?.channel ?? '')
                    .name('channel')
                    .style({
                        decoration: {
                            labelText: 'Platform channel name',
                            helperText: 'If needed'
                        }
                    }),
                TextField(post?.url ?? '').name('url').style({
                    decoration: {
                        labelText: 'Post URL',
                        helperText: 'Full URL: https://www.lenra.io/my-post',
                        prefixIcon: Icon('link').toJSON()
                    }
                }),
                TextField(post ? date[0] : '').name('date').style({
                    decoration: {
                        labelText: 'Post date',
                        helperText: 'Format: yyyy-mm-dd',
                        prefixIcon: Icon('calendar_today').toJSON()
                    }
                }),
                TextField(post ? date[1] : '').name('time').style({
                    decoration: {
                        labelText: 'Post time',
                        helperText: 'At UTC with the next format: hh:mm:ss',
                        prefixIcon: Icon('access_time').toJSON()
                    }
                })
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
                        path: post ? `/${platform.slug}/${post.slug}` : `/${platform.slug}`
                    }),
                    Button("Save").submit(true).onPressed("@lenra:navTo", {
                        path: `/${platform.slug}`
                    })
                ]
            })
    ).onSubmit(action == 'edit' ? 'onPostUpdate' : 'onPostCreate', { post, platform })
}
