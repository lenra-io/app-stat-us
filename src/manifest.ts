import { Manifest, View } from '@lenra/app';
import Platform from './classes/Platform.js';
import Post from './classes/Post.js';
import User from './classes/User.js';
import PostStat from './classes/PostStat.js';
import Org from './classes/Org.js';

const manifest: Manifest = {
    lenra: {
        routes: [
            {
                path: "/",
                view: View('guards.guards').props({
                    page: View("pages.home"),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, { id: '@me' })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/new",
                view: View('guards.guards').props({
                    page: View("pages.platform_edit")
                            .props({
                                action: 'new'
                            }),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/org/new",
                view: View('guards.guards').props({
                    page: View("pages.org_edit")
                            .props({
                                action: 'new'
                            }),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/org/:org",
                view: View('guards.guards').props({
                    page: View("pages.org"),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.org')
                            .find(Org, {
                                slug: '@route.org'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/org/:org/edit",
                view: View('guards.guards').props({
                    page: View("pages.org_edit"),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.org')
                            .find(Org, {
                                slug: '@route.org'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            }, {
                path: "/org/:org/invite",
                view: View('guards.guards').props({
                    page: View("pages.org_invite"),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.org')
                            .find(Org, {
                                slug: '@route.org'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/:platform",
                view: View('guards.guards').props({
                    page: View("pages.platform")
                            .props({
                                limit: 10,
                                pagination: 1
                            }),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: '@route.platform'
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/:platform/edit",
                view: View('guards.guards').props({
                    page: View("pages.platform_edit"),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: "@route.platform"
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/:platform/new",
                view: View('guards.guards').props({
                    page: View('pages.post_edit')
                        .props({
                            action: 'new'
                        })
                        .context({
                            'me': true,
                            'pathParams': true
                        }),
                    guards: [
                        View("guards.userIsRegistered")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: "@route.platform"
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/:platform/:post",
                view: View('guards.guards').props({
                    page: View("pages.post"),
                    guards: [
                        View('guards.platform')
                            .find(Platform, {
                                slug: '@route.platform'
                            }),
                        View('guards.post')
                            .find(Post, {
                                slug: "@route.post"
                            })
                    ]
                })
                .context({
                    'me': true,
                    'pathParams': true
                }).toJSON()
            },
            {
                path: "/:platform/:post/edit",
                view: View('guards.guards').props({
                    page: View('pages.post_edit'),
                    guards: [
                        View('guards.userIsRegistered').find(User, {
                            id: '@me'
                        }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: "@route.platform"
                            }),
                        View('guards.post')
                            .find(Post, {
                                slug: "@route.post"
                            })
                    ]
                }).context({
                    me: true,
                    pathParams: true
                }).toJSON()
            },
            {
                path: "/:platform/:post/new",
                view: View('guards.guards').props({
                    page: View("pages.post_stat_edit").props({
                        action: 'new'
                    }),
                    guards: [
                        View('guards.userIsRegistered')
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: '@route.platform'
                            }),
                        View('guards.post')
                            .find(Post, {
                                slug: "@route.post"
                            })
                    ]
                })
                .context({
                    'me': true,
                    'pathParams': true
                }).toJSON()
            },
            {
                path: "/:platform/:post/:stat/edit",
                view: View('guards.guards').props({
                    page: View("pages.post_stat_edit")
                        .find(PostStat, {
                            slug: '@route.stat'
                        }),
                    guards: [
                        View('guards.userIsRegistered')
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: '@route.platform'
                            }),
                        View('guards.post')
                            .find(Post, {
                                slug: "@route.post"
                            }),
                        View('guards.post_stat')
                            .find(PostStat, {
                                slug: "@route.stat"
                            })
                    ]
                })
                .context({
                    'me': true,
                    'pathParams': true
                }).toJSON()
            }
        ]
    }
};

export default manifest;
