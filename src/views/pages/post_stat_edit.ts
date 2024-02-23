'use strict'

import { ViewRequest, Button, Flex, padding, Container, Form, TextField, Icon, Text, DropdownButton, Menu, MenuItem, Actionable, borderRadius } from "@lenra/app";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';
import PostStat from "../../classes/PostStat.js";
import Platform from "../../classes/Platform.js";
import { dateAndTimeStrToNumber, numberToDateAndTimeStr } from "../../utils/string.js";
import User from "../../classes/User.js";
import { StatEndpoint } from "../../classes/StatEndpoint.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: PostStat[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    const platform = props.data?.['guards.platform']?.[0] as Platform
    const post = props.data?.['guards.post']?.[0] as Post
    const post_stat = data[0] ?? props.data?.['guards.post_stat']?.[0] as PostStat
    const action = props.action as string ?? 'edit';

    if (user.state?._slug != post_stat?.slug)
        user.state = undefined

    let date: string[]
    if (post_stat) {
        date = numberToDateAndTimeStr(post_stat.date)
    } else {
        date = numberToDateAndTimeStr(Date.now())
    }

    const currentType = user.state?.type ? StatEndpoint.types.find(type => type.name == user.state?.type) : StatEndpoint.types.find(type => type.name == props?.enpointType)

    let children = [
        ...Object.entries(platform).reduce((acc, [field, selected]) => {
            if (typeof selected === 'boolean' && selected) {
                const stat = PostStat.fields.find(stat=>stat.name == field)
                return [...acc, TextField(post_stat?.[field] ?? '')
                    .name(field)
                    .style({
                    decoration: {
                        labelText: stat.displayName,
                        prefixIcon: Icon(stat.icon).toJSON()
                    }
                })]
             }
            return acc
        }, []),
        TextField(date[0]).name('date').style({
            decoration: {
                labelText: 'Post date',
                helperText: 'Format: yyyy-mm-dd',
                prefixIcon: Icon('calendar_today').toJSON()
            }
        }),
        TextField(date[1]).name('time').style({
            decoration: {
                labelText: 'Post time',
                helperText: 'At UTC with the next format: hh:mm:ss',
                prefixIcon: Icon('access_time').toJSON()
            }
        })
    ]
    if (currentType) {
        children = currentType.form?.map(field => {
            if (user.state[field['model']['name']]) {
                field['model']['value'] = user.state[field['model']['name']]
            }
            return field
        })
    }
    return Form(
        ViewLayout(
            Container(Flex([
                Text(platform.name ?? 'New Stat').style({
                    fontSize: 32,
                    fontWeight: 'bold'
                }),
                // Uncomment this when dropdown issue is fixed :
                // DropdownButton(currentType?.displayName ?? 'Select a type', Menu(
                //     StatEndpoint.types.filter(t => t.name != currentType?.name).map(type =>
                //         MenuItem(type.displayName)
                //             .isSelected(type.name == currentType?.name)
                //             .onPressed('updateUser', {
                //                 id: '@me',
                //                 'state._slug': post_stat?.slug,
                //                 'state.type': type.name
                //             })
                //     )
                // )),
                Menu(
                    [{ name: null, displayName: 'Manual' } as StatEndpoint, ...StatEndpoint.types].map(type => {
                        return MenuItem(type.displayName)
                            .isSelected(type.name == currentType?.name)
                            .onPressed('updateUser', {
                                id: '@me',
                                'state._slug': post_stat?.slug,
                                'state.type': type.name
                            })
                    })
                ),
                ...children
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
                    post_stat ? Actionable(Container(
                        Flex([Icon("warning"), Text("Delete")]).crossAxisAlignment('center')
                    ).color(0xFFD0342C).borderRadius(borderRadius.all(25)).height(35)
                    ).onPressed("onPostStatDelete", { _id: post_stat?._id }) : null,
                    Button("Save").submit(true).onPressed("@lenra:navTo", {
                        path: post ? `/${platform.slug}/${post.slug}` : `/${platform.slug}`
                    })
                ].filter((value)=>value !== null)
            })
    ).onSubmit(action == 'edit' ? 'onPostStatUpdate' : 'onPostStatCreate', { post_stat, post, stat_endpoint: currentType?.name })
}
