'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button, ListenerRequest, View } from "@lenra/app";
import ViewLayout from '../layout.js';
import Org, { Member, Role } from "../../classes/Org.js";
import User from "../../classes/User.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (users: User[], props: ListenerRequest['props'], context: ViewRequest['context']) {
    const org = props.data?.['guards.org']?.[0] as Org
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    if (user.state?.slug != `${org.slug}/invite`) {
        user.state = undefined
    }

    return ViewLayout(
        Container(Flex([
            Text(org.name).style({
                fontSize: 24,
                fontWeight: "bold"
            }),
            TextField('').style({
                decoration: {
                    labelText: 'Search by name'
                }
            }).onChanged("onOrgInviteSearch", { org }),
            ...(user.state?.users?.map((user, i) => {
                const member = {
                    role: Role.VIEWER,
                    user: user
                } as Member
                return View('components.member_card')
                    .find(User, {
                        id: user
                    })
                    .props({
                        member: member,
                        backgroundColor: i % 2 ? 0xFFFAFAFA : 0xFFFFFFFF,
                        actions: [
                            Button('')
                                .leftIcon(Icon("mail").toJSON())
                                .onPressed('onOrgUpdateMumbers', { org: org._id, member })
                        ]
                    })
            }) ?? [])
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
                        path: org ? `/${org.slug}` : '/'
                    }),
                Button("Save").submit(true).onPressed("@lenra:navTo", {
                    path: org ? `/${org.slug}` : '/'
                })
            ]
        })
}
