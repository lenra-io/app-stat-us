import { ViewRequest, Component, Flex, IComponent, View, Container, padding, Button } from "@lenra/app"
import Post from "../../classes/Post.js";
import Platform from "../../classes/Platform.js";
import ViewLayout from '../layout.js';
import User from "../../classes/User.js";
import Org from "../../classes/Org.js";

export default function (_data: ViewRequest['data'], props: ViewRequest['props']): Component<IComponent> | IComponent {
    const user = props.data?.['guards.userIsRegistered']?.[0] as User
    const org = props.data?.['guards.currentOrg']?.[0] as Org

    return ViewLayout(Flex([
        View("components.platform_list")
            .find(Platform, { org: user.selectedOrg }, { _id: true, name: true}),
        Container(
            View("components.post_list")
                .find(Post, { org: user.selectedOrg })
                .props({
                    limit: props.limit,
                    page: props.page
                })
        ).padding(padding.symmetric(32, 0))
    ])
        .direction("vertical")
        .spacing(32)
        .padding({
            top: 16,
            bottom: 32
        })
        .crossAxisAlignment("center"),
         {
            actions: [
                Button("Create platform").onPressed("@lenra:navTo", {
                    path: `/new`
                })
            ]
        });
}
