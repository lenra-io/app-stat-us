'use strict'

import { ViewRequest, Container, Text, Flex, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"
import Org from "../../classes/Org.js";
import User from "../../classes/User.js";

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    const orgs = (data as unknown as Org[]).filter(org=>org.members.map(member=>member.user).includes(user.id))
    const [org] = orgs

    if (!org) {
        return ViewLayout(Flex([
            Container(
                Text('Error 404: Organisation not found...')
                    .style({
                        fontSize: 32
                    })
            )
        ]).direction('vertical').crossAxisAlignment("center"), {
            actions: [
                Button("Back")
                    .mainStyle("secondary")
                    .onPressed("@lenra:navTo", {
                        path: `/`
                    })
            ]
        })
    }
    return guards(orgs as any, { guardname: 'guards.org', ...props }, context)
}
