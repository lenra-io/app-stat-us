'use strict'

import { ViewRequest, Container, Text, Flex, TextField, Form, Toggle, padding, Icon, Flexible, Button } from "@lenra/app";
import ViewLayout from '../layout.js';
import guards from "./guards"
import Platform from "../../classes/Platform.js";

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
    const [platform] = data as unknown as Platform[]
    if (!platform) {
        return ViewLayout(Flex([
            Container(
                Text('Error 404: Platform not found...')
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
    return guards(data, { guardname: 'guards.platform', ...props }, context)
}
