'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding, Container, Text, Actionable, borderRadius } from "@lenra/app";
import ViewLayout from '../layout.js';
import { default as Org, Role as OrgRole, Role } from "../../classes/Org.js";
import User from "../../classes/User.js";

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function (data: Org[], props: ViewRequest['props'], context: ViewRequest['context']) {
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    const org = data.length > 0 ? data[0] : props.data?.['guards.org']?.[0] as Org
    const orgUser = org.members.find(member => member.user == user.id)

    let actions: any[] = [
        Button('Back').mainStyle("secondary")
            .onPressed('@lenra:navTo', {
                path: '/'
            })
    ]
    if (orgUser.role == OrgRole.OWNER) {
        actions = [...actions,
        Actionable(
            Container.card(
                Text("Delete Org")
                    .style({
                        color: 0xFFFFFFFF,
                        fontWeight: "bold"
                    })
            )
                .color(0xFFF70F0F)
                .borderRadius(borderRadius.all(5))
        ).onPressed('deleteOrg', {
            _id: org._id
        })
        ]
    }

    return ViewLayout(
        Container(
            Flex([
                Flex([
                    Flexible(
                        Text(org.name).style({
                            fontSize: 32,
                            fontWeight: 'bold'
                        })
                    ),
                    Button("Invite")
                        .mainStyle("secondary")
                        .onPressed("@lenra:navTo", {
                            path: `/org/${org.slug}/edit`
                        })
                ])
                    .spacing(16)
                    .crossAxisAlignment("center"),

                Text("Members:").style({
                    fontWeight: "bold",
                    fontSize: 18
                }),
                Container.card(Flex([
                    Text('Username').style({
                        fontWeight: 'bold'
                    }),
                    Text('Role').style({
                        fontWeight: 'bold'
                    }),
                    Text('Actions').style({
                        fontWeight: 'bold'
                    })
                ]).mainAxisAlignment('spaceAround')).color(0xFFFAFAFA),
                ...org.members.map((member, i) => {
                    let actions = []
                    if (member.user == orgUser.user) {
                        actions = [...actions,
                            Button('Leave')
                                .onPressed('removeMember', {
                                    org: org._id,
                                    member: {
                                        user: member.user,
                                    }
                                })
                        ]
                    } else if (orgUser.role >= OrgRole.MODERATOR && orgUser.role > member.role) {
                        actions = [...actions,
                        Button('Ban')
                            .onPressed('removeMember', {
                                org: org._id,
                                member: {
                                    user: member.user,
                                }
                            })
                        ]
                    }
                    if (orgUser.role >= OrgRole.ADMIN && orgUser.role-1 > member.role) {
                        actions = [...actions,
                            Button('Promote').onPressed('updateMember', {
                                org: org._id,
                                member: {
                                    ...member,
                                    role: member.role + 1
                                }
                            })
                        ]
                    }
                    if (orgUser.role >= OrgRole.ADMIN && member.role > OrgRole.VIEWER && orgUser.role-1 > member.role) {
                        actions = [...actions,
                            Button('Demote').onPressed('updateMember', {
                                org: org._id,
                                member: {
                                    ...member,
                                    role: member.role - 1
                                }
                            })
                        ]
                    }
                    return View('components.member_card')
                        .find(User, {
                            id: member.user
                        })
                        .props({
                            member: member,
                            backgroundColor: i % 2 ? 0xFFFAFAFA : 0xFFFFFFFF,
                            actions: actions
                        })
                })
                ])
                .spacing(16)
                .padding(padding.all(32))
                .crossAxisAlignment("stretch")
                .direction("vertical")
            ).maxWidth(900),
{
        actions: actions
    });
}
