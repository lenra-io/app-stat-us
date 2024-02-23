import { ViewRequest, Flex, Component, View, Container, padding, Text, Button, ViewImpl, IComponent, Actionable, Icon, borderRadius, colors } from "@lenra/app"
import Post from "../../classes/Post.js";
import Platform from "../../classes/Platform.js";
import guards from "../guards/guards.js";
import User from "../../classes/User.js";

// TODO: Transform this into a form instead of reading changes from the state
export default function (posts: Post[], props: ViewRequest['props'], context: ViewRequest['context']): Component<IComponent> | IComponent {
    const platform = props.platform as Platform
    const user = props.user as User

    const limit = props.limit as number ?? 10;
    const start = limit * (props.pagination as number ?? 1);

    let filteredPosts = posts
        // .sort((a: Post, b: Post) => b.date - a.date);
    // if (limit) filteredPosts = filteredPosts.slice(start, limit);
    let children = filteredPosts.map<Component<IComponent>>(post => {
        return View('guards.guards').props({
            page: View("components.post_card")
                .find(Post, {
                    _id: post._id
                }),
            guards: [
                View('guards.platform').find(Platform, {
                    _id: post.platform
                })
            ]
        })
    })
    if (platform !== undefined) {
        children.unshift(Container(Button("New post")
            .onPressed("@lenra:navTo", {
                path: `/${platform.slug}/new`
        })).width(250).alignment('center'))
    }

    return Container(Flex(children)
        .spacing(16)
        .crossAxisAlignment('stretch')
        .direction("vertical"))
}
