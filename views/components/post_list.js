const { border, Container, View, Button, Flex, Actionable, Text, Flexible, padding } = require('@lenra/components');
const Platform = require('../../classes/Platform.js');
const Post = require('../../classes/Post.js');
const PostStat = require('../../classes/PostStat.js');
const navigationService = require('../../services/navigationService.js');
const { platformNavigation } = require('./platform_list.js');
const { url } = require('./url.js');

/**
 * 
 * @param {Post[]} posts 
 * @param {*} props 
 * @returns 
 */
function post_list(posts, props) {
    const limit = props.limit || props.pagination;
    let filteredPosts = [...posts]
        .sort((a, b) => b.date - a.date);
    if (limit) filteredPosts = filteredPosts.slice(0, limit);
    let children = filteredPosts.map(post => {
        return View("post_card")
            .data(Post.collection, {
                _id: post._id
            });
    });
    if (props.add) children.unshift(Button("New post")
        .onPressed("pushState", {
            page: "edit_post",
            platform: props.platform,
        })
    );
    if (props.pagination && limit < posts.length) children.push(Button("+")
        .onPressed("setStateProperty", {
            property: "limit",
            value: limit + 5
        })
    );
    return Flex(...children)
        .spacing(16)
        .crossAxisAlignment("stretch")
        .direction("vertical");
}

/**
 * 
 * @param {Post[]} param0 
 * @param {*} props 
 * @returns 
 */
function post_card([post], props) {
    let name = post.name;
    if (post.channel) name = `${post.channel} - ${name}`;
    return Actionable(
        Container.card(
            Flex(
                Flex(
                    View("platform_card")
                        .data(Platform.collection, {
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
                    View("updateStatus")
                        .data(PostStat.collection, {
                            post: post._id
                        })
                        .props({
                            date: post.date,
                        })
                ).spacing(16),
                Text(`type: ${Post.types.find(type => type.name == post.type)?.displayName || "Not defined"}`),
                url([post], {}),
                View("post_stats")
                    .data(PostStat.collection, {
                        post: post._id,
                    })
                    .props({
                        limit: 1,
                        postDate: post.date,
                    })
            )
                .spacing(16)
                .mainAxisAlignment("spaceEvenly")
                .direction("vertical")
                .padding(padding.symmetric(16))
        )
    ).onPressed("replaceNavigation", postNavigation(post.platform, post._id));
}

function post_title([post], props) {
    let child = Text(post.name);
    if (props.padding)
        child = Container(child).padding(props.padding);
    if (props.onPressed) {
        child = {
            type: "actionable",
            child,
            onPressed: props.onPressed
        };
    }
    return child;
}

function postNavigation(platformId, postId) {
    // Deep copy
    const navigation = platformNavigation(platformId);
    navigation.history.push(navigation.state);
    navigation.state = {
        page: "post",
        platform: platformId,
        post: postId,
    }
    return navigation;
}

module.exports = {
    post_list,
    post_card,
    post_title,
    postNavigation,
}