const Platform = require('../../classes/Platform.js');
const Post = require('../../classes/Post.js');
const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js');

function menu(data, props) {
    const children = [{
        type: "view",
        name: "ariane",
        coll: navigationService.collection,
        query: {
            user: "@me"
        }
    }];
    if (props && props.mainAction) {
        children.push({
            ...props.mainAction,
            type: "button"
        });
    }
    return {
        type: "container",
        decoration: {
            color: 0xFFFFFFFF,
            boxShadow: {
                blurRadius: 8,
                color: 0x1A000000,
                offset: {
                    dx: 0,
                    dy: 1
                }
            },
        },
        child: {
            type: "flex",
            fillParent: true,
            mainAxisAlignment: "spaceBetween",
            crossAxisAlignment: "center",
            padding: ui.padding.symmetric(32, 16),
            children
        }
    }
}

/**
 * @param {Navigation[]} navs
 * @param {*} _props 
 * @returns 
 */
function ariane([navigation], _props) {
    if (navigation.history.length == 0) {
        return fillViewPageName(navigation.state, {
            type: "text",
            style: {
                fontWeight: "bold",
                fontSize: 24
            },
        });
    }
    return {
        type: "flex",
        crossAxisAlignment: "center",
        children: [
            ...navigation.history.flatMap((state, i) => {
                return [
                    fillViewPageName(state, {
                        type: "button",
                        mainStyle: "tertiary",
                        onPressed: {
                            action: "popState",
                            props: {
                                times: navigation.history.length - i
                            }
                        }
                    }),
                    {
                        type: "text",
                        value: "/",
                    }
                ]
            }),
            fillViewPageName(navigation.state, {
                type: "container",
                padding: ui.padding.symmetric(16, 8),
                child: {
                    type: "text",
                    style: {
                        fontWeight: "bold",
                    },
                }
            })
        ]
    };
}

/**
 * @param {*} state 
 * @param {*} view 
 * @returns 
 */
function fillViewPageName(state, view) {
    switch (state.page) {
        case 'home':
            return fillViewText(view, 'Stat Us');
        case 'platform':
            return {
                type: "view",
                name: "platform_title",
                coll: Platform.collection,
                query: {
                    _id: state.platform
                },
                props: {
                    padding: ui.padding.symmetric(16, 8),
                    onPressed: view.type == "button" ? view.onPressed : null
                }
            };
        case 'post':
            return {
                type: "view",
                name: "post_title",
                coll: Post.collection,
                query: {
                    _id: state.post
                },
                props: {
                    padding: ui.padding.symmetric(16, 8),
                    onPressed: view.type == "button" ? view.onPressed : null
                }
            };
        case 'edit_platform':
            return fillViewText(view, state.platform ? 'Edit' : 'Create platform');
        case 'edit_post':
            return fillViewText(view, 'New post');
        case 'new_post_stats':
            return fillViewText(view, 'Add stats');
        default:
            console.error(`Not managed page ${state.page}`);
            return fillViewText(view, state.page);
    }
}

/**
 * @param {*} view
 * @param {string} text 
 * @returns 
 */
function fillViewText(view, text) {
    switch (view.type) {
        case "container":
            view = { ...view, child: fillViewText(view.child, text) };
            break;
        case "text":
            view = { ...view, value: text };
            break;
        case "button":
            view = { ...view, text };
            break;
        default:
            console.error(`Not managed view type ${view.type}`);
    }
    return view;
}

module.exports = {
    menu,
    ariane
}