import { ViewRequest, Component, IComponent, Container, Text, borderRadius, Actionable, colors, Flex, View, Flexible, padding } from "@lenra/app"
import Post from "../../classes/Post";
import Platform from "../../classes/Platform";
import PostStat from "../../classes/PostStat";

export default function([post]: Post[], props: ViewRequest['props']): Component<IComponent> | IComponent {
    let name = post.name;
    const platform = props.platform as Platform ?? props.data?.['guards.platform']?.[0]

    if (post.channel) name = `${post.channel} - ${name}`;
    return Actionable(
        Container.card(
            Flex([
                Flex([
                    View("components.platform_card")
                        .find(Platform, {
                            _id: post.platform
                        })
                        .props({
                            size: 24,
                            boxShadow: {}
                        }),
                    Flexible(
                    Text(name)
                            .style({
                                fontSize: 16,
                                fontWeight: "bold",
                            })
                    ),
                    // View("components.updateStatus")
                    //     .find(PostStat, {
                    //         post: post._id
                    //     })
                    //     .props({
                    //         date: post.date,
                    //     })
                    ]).spacing(16),
                Text(`type: ${Post.types.find(type => type.name == post.type)?.displayName || "Not defined"}`),
                View("components.url")
                    .find(Post, {
                        _id: post._id
                    }),
                // View("components.post_stats")
                //     .find(PostStat, {
                //         post: post._id,
                //     })
                //     .props({
                //         limit: 1,
                //         postDate: post.date,
                //     })
            ])
                .spacing(16)
                .mainAxisAlignment("spaceEvenly")
                .direction("vertical")
                .padding(padding.symmetric(16, 0))
        )
    ).onPressed("@lenra:navTo", {
        path: `/${platform.slug}/${post.slug}`
    })
}
