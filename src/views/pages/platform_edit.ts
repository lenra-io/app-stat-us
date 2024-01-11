'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import ViewLayout from '../layout.js';
import PostStat from "../../classes/PostStat.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: Platform[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const platforms = data.length > 0 ? data : props.data?.['guards.platform'] ?? []
    const platform = platforms[0]
    const action = props.action as string ?? 'edit';

    return Form(
        ViewLayout(
            Container(Flex([
                TextField(platform?.name ?? '').style({
                    decoration: {
                        labelText: 'Platform name'
                    }
                }).name('name'),
                TextField(platform?.color?.toString() ?? '').style({
                    decoration: {
                        labelText: 'Color'
                    }
                }).name('color'),
                TextField(platform?.url ?? '').style({
                    decoration: {
                        labelText: 'Page URL'
                    }
                }).name('url'),
                TextField(platform?.account ?? '').style({
                    decoration: {
                        labelText: 'Platform account name'
                    }
                }).name('account'),
                ...PostStat.fields.map(field => Flex([
                    Container(Icon(field.icon)).padding({
                        right: 10
                    }),
                    Flexible(Text(field.displayName)),
                    Toggle(platform ? platform[field.name] ?? false : false).name(field.name)
                ]))
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
                            path: platform ? `/${platform.slug}` : '/'
                        }),
                    Button("Save").submit(true).onPressed("@lenra:navTo", {
                        path: platform ? `/${platform.slug}` : '/'
                    })
                ]
            })
    ).onSubmit(action == 'edit' ? 'onPlatformUpdate' : 'onPlatformCreate', { platform });
}
