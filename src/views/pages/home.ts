import { ViewRequest, Component, Flex, IComponent, View, Container, padding, Button } from "@lenra/app"
import Post from "../../classes/Post.js";
import Platform from "../../classes/Platform.js";
import ViewLayout from '../layout.js';

export default function (_data: ViewRequest['data'], props: ViewRequest['props']): Component<IComponent> | IComponent {
    return ViewLayout(Flex([
        View("components.platform_list")
            .find(Platform, {}, { _id: true, name: true}),
        Container(
            View("components.post_list")
                .find(Post, {})
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
