'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import Org from "../../classes/Org.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: Org[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const orgs = data.length > 0 ? data : props.data?.['guards.org'] ?? [] as Org[]
    const org = orgs[0]
    const action = props.action as string ?? 'edit';

    return Form(
        ViewLayout(
            Container(Flex([
                TextField(org?.name ?? '').style({
                    decoration: {
                        labelText: 'Organisation name'
                    }
                }).name('name'),
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
                            path: org ? `/org/${org.slug}` : '/'
                        }),
                    Button("Save").submit(true).onPressed("@lenra:navTo", {
                        path: org ? `/org/${org.slug}` : '/'
                    })
                ]
            })
    ).onSubmit(action == 'edit' ? 'onOrgUpdate' : 'onOrgCreate', { org });
}
