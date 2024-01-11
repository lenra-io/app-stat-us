import { Manifest, View } from '@lenra/app';
import Platform from './classes/Platform.js';
import Post from './classes/Post.js';
import guards from './views/guards/guards.js';
import FormState from './classes/FormState.js';
import User from './classes/User.js';

const manifest: Manifest = {
    lenra: {
        routes: [
            {
                path: "/",
                view: guards([], {
                    page: View("pages.home"),
                    guards: [
                        View("guards.currentUser")
                            .find(User, { id: '@me' })
                    ]
                }).toJSON()
            },
            {
                path: "/new",
                view: guards([], {
                    page: View("pages.platform_edit")
                            .props({
                                action: 'new'
                            }),
                    guards: [
                        View("guards.currentUser")
                            .find(User, {
                                id: '@me'
                            })
                    ]
                }).toJSON()
            },
            {
                path: "/:platform",
                view: guards([], {
                    page: View("pages.platform")
                            .props({
                                limit: 10,
                                pagination: 1
                            }),
                    guards: [
                        View("guards.currentUser")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: 'twitch'
                            })
                    ]
                }).toJSON()
            },
            {
                path: "/:platform/edit",
                view: guards([], {
                    page: View("pages.platform_edit"),
                    guards: [
                        View("guards.currentUser")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: "twitch"
                            })
                    ]
                }).toJSON()
            },
            {
                path: "/:platform/new",
                view: guards([], {
                    page: View('pages.post_edit')
                        .props({
                            action: 'new'
                        })
                        .context({
                            'me': true,
                            'pathParams': true
                        }),
                    guards: [
                        View("guards.currentUser")
                            .find(User, {
                                id: '@me'
                            }),
                        View('guards.platform')
                            .find(Platform, {
                                slug: "twitch"
                            }),
                        View('guards.formState')
                            .find(FormState, {
                                user: '@me'
                            })
                    ]
                }).toJSON()
            },
            {
                path: "/:platform/:post",
                view: View("pages.post")
                    .find(Post, {
                    slug: "@route.post"
                    })
                    .props({
                        limit: 10,
                        pagination: 1
                    })
                    .context({
                        'me': true,
                        'pathParams': true
                    }).toJSON()
            },
            {
                path: "/:platform/:post/edit",
                view: guards([], {
                    page: View('pages.post_edit')
                        .props({
                            action: 'new'
                        })
                        .context({
                            'me': true,
                            'pathParams': true
                        }),
                    guards: [
                        View('guards.platform')
                            .find(Platform, {
                                slug: "twitch"
                            }),
                        View('guards.post')
                            .find(Post, {
                                slug: "@route.post"
                            }),
                        View('guards.formState')
                            .find(FormState, {
                                user: '@me'
                            })
                    ]
                }).toJSON()
            }
        ]
    }
};

export default manifest;
