'use strict'

import { ViewRequest, Container, Text, Flex, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"
import Org from "../../classes/Org.js";

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const [org] = data as unknown as Org[]
    const user = props.data?.['guards.userIsRegistered']?.[0]

    let hasAccess = true
    if (user) {
        hasAccess = false
        hasAccess = org.members.some(member=>member.user == user.id)
    }

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
    return guards(data, { guardname: 'guards.org', ...props }, context)
}
