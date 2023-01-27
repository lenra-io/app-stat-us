const Platform = require('../../classes/Platform.js');
const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js')

function post_list(posts, props) {
    const limit = props.limit || props.pagination;
    let filteredPosts = posts
    // .sort((a, b) => a - b);
    if (limit) filteredPosts = filteredPosts.slice(0, limit);
    let children = filteredPosts.map(platform => {
        return {
            type: "view",
            name: "post_card",
            coll: navigationService.collection,
            query: {
                user: platform._id
            }
        }
    });
    // if (props.add) children.unshift(card("+", ui.color.grey, {
    //     action: "pushState",
    //     props: {
    //         page: "edit_post"
    //     }
    // }));
    if (props.pagination && limit < posts.length) children.push(card("+", ui.color.grey, {
        action: "setStateProperty",
        props: {
            property: "limit",
            value: props.limit + 5
        }
    }));
    return {
        type: "container",
        constraints: { maxWidth: 600 },
        child: {
            type: "flex",
            spacing: 16,
            mainAxisAlignment: "start",
            crossAxisAlignment: "stretch",
            direction: "vertical",
            children
        }
    }
}

function post_card([post], props) {
    return {
        type: "actionable",
        child: {
            type: "container",
            border: ui.border.all({
                width: 0.5,
                color: 0xFFDCE0E7
            }),
            decoration: {
                // TODO: a color to update a post
                // color: currentPlayer._id != props.game.lastPlayer ? ui.color.blue : ui.color.white,
                color: ui.color.white,
                borderRadius: ui.borderRadius.all(8),
                boxShadow: {
                    blurRadius: 10,
                    offset: {
                        dx: 4,
                        dy: 4
                    },
                    color: ui.color.opacity(ui.color.black, 0.7)
                },
            },
            child: {
                type: "flex",
                spacing: 16,
                mainAxisAlignment: "spaceEvenly",
                direction: "vertical",
                padding: {
                    left: 16,
                    right: 16
                },
                children: [
                    {
                        type: "flex",
                        spacing: 16,
                        children: [
                            {
                                "type": "view",
                                "name": "platform_card",
                                "coll": Platform.collection,
                                "query": {
                                    "_id": "post.platform"
                                },
                                props: {
                                    size: 24,
                                    boxShadow: {}
                                }
                            }, {
                                type: "text",
                                style: {
                                    fontSize: 16
                                },
                                value: "My post subject"
                            }
                        ]
                    }, {
                        type: "flex",
                        spacing: 16,
                        children: [
                            {
                                type: "text",
                                value: "500 views"
                            }
                        ]
                    }
                ]
            }
        },
        onPressed: {
            action: "pushState",
            props: {
                page: "post",
                // post: post._id
            }
        }
    };
}

module.exports = {
    post_list,
    post_card
}