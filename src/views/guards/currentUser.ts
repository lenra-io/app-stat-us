'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const [user] = data
    if (!user) {
        return ViewLayout(Container(Form(Flex([
                Text("It seems you didn't have an account yet.")
                    .style({
                        fontSize: 32
                    }),
                Text("Create one now !"),
                TextField("")
                    .name("username")
                    .style({
                        decoration: {
                            labelText: 'Username'
                        }
                    }),
                Button("Create account").submit(true).mainStyle("primary")
            ]).direction('vertical').mainAxisAlignment("center").crossAxisAlignment("center").spacing(10)
        ).onSubmit('createUser', { user: "@me" })).maxWidth(600).padding({top: 20, right: 20, left: 20, bottom: 20}))
    }
    return guards(data, { guardname: 'guards.user', ...props }, context)
}
