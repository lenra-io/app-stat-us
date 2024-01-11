import { ViewRequest, Flex, Component, View, Container, padding, Text, Button, ViewImpl, IComponent, Actionable, Icon, borderRadius, colors } from "@lenra/app"
import Post from "../../classes/Post.js";
import Platform from "../../classes/Platform.js";

// TODO: Transform this into a form instead of reading changes from the state
export default function (posts: Post[], props: ViewRequest['props'], context: ViewRequest['context']): Component<IComponent> | IComponent {
    // Show platform list
    const limit = props.limit as number ?? 10;
    const start = limit * (props.pagination as number ?? 1);

    let filteredPosts = [...posts]
        .sort((a: Post, b: Post) => b.date - a.date);
    if (limit) filteredPosts = filteredPosts.slice(start, limit);
    let children = filteredPosts.map<Component<IComponent>>(post => {
        return View("post_card")
            .find(Post, {
                _id: post._id
            });
    });
    if (props.platformSlug !== undefined) {
        children.unshift(Button("New post")
            .onPressed("@lenra:navTo", {
                path: `/${props.platformSlug}/new`
        }))
    }
    return filteredPosts.length > 0 ? Container.card(Flex(children)
        .spacing(16)
        .crossAxisAlignment("stretch")
        .direction("vertical")) : Container();
}
