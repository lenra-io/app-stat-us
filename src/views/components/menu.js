import { padding, View, Flex, Container, colors, Text } from '@lenra/app';
import { collection } from '../../classes/Platform.js';
import { collection as _collection } from '../../classes/Post.js';
import { collection as __collection } from '../../services/navigationService.js';

export function menu(data, props) {
    const flex = Flex(
        View("ariane")
            .data(__collection, {
                user: "@me"
            })
    )
        .fillParent(true)
        .mainAxisAlignment("spaceBetween")
        .crossAxisAlignment("center")
        .padding(padding.symmetric(32, 16));
    if (props && props.mainAction) {
        flex.addChild({
            ...props.mainAction,
            type: "button"
        });
    }
    return Container(flex)
        .color(colors.Colors.white)
        .boxShadow({
            blurRadius: 8,
            color: 0x1A000000,
            offset: {
                dx: 0,
                dy: 1
            }
        });
}

/**
 * @param {Navigation[]} navs
 * @param {*} _props
 * @returns
 */
export function ariane([navigation], _props) {
    if (navigation.history.length == 0) {
        return fillViewPageName(navigation.state, {
            type: "text",
            style: {
                fontWeight: "bold",
                fontSize: 24
            },
        });
    }
    return Flex(
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
                Text("/")
            ]
        }),
        fillViewPageName(navigation.state, {
            type: "container",
            padding: padding.symmetric(16, 8),
            child: {
                type: "text",
                style: {
                    fontWeight: "bold",
                },
            }
        })
    )
        .crossAxisAlignment("center");
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
            return View("platform_title")
                .data(collection, {
                    _id: state.platform
                })
                .props({
                    padding: padding.symmetric(16, 8),
                    onPressed: view.type == "button" ? view.onPressed : null
                });
        case 'post':
            return View("post_title")
                .data(_collection, {
                    _id: state.post
                })
                .props({
                    padding: padding.symmetric(16, 8),
                    onPressed: view.type == "button" ? view.onPressed : null
                });
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

export default (_data, _props) => View("menu")
