const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js')

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
function ariane(navs, _props) {
    const navigation = navs[0];
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