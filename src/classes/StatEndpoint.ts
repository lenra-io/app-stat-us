import { Component, Data, TextField, ListenerHandler, ListenerRequest, Api } from "@lenra/app";
import { LenraComponent} from "@lenra/app/dist/lib/gen/response";
import Platform from "./Platform";
import Post from "./Post";
import PostStat from "./PostStat";
import { slugify } from "../utils/string";

const APP_UUID = process.env.APP_UUID ?? '00000000-0000-0000-0000-000000000000'

export type EndpointType = "webhook" | "cron"

export type Action = ListenerHandler

export type ActionOption = RequestInit | any

export class StatEndpoint extends Data {
    /**
     * @param {string} type The endpoint type
     * @param {string} name The internal endpoint's name
     * @param {string} displayName The endpoint name displayed in the app
     * @param {string} slug The endpoint slug in URL
     * @param {number} creation_date when the endpoint was created
     * @param {string} post The post_id where this stat_endpoint is linked to.
     * @param {Action} action The listener function that will be called by the webhook or cron
     * @param {Component<LenraComponent>[]} from The form that will show in PostStat page and allow to set settings for the endpoint
     */
    type: string = 'unkown'
    name: string
    displayName: string
    slug: string
    creation_date: number
    post: string
    endpoint: string | null
    action: Action
    form: Component<LenraComponent>[]

    constructor(name: string, displayName: string, slug: string, creation_date: number, post: string, action: Action, form: Component<LenraComponent>[]) {
        super()
        this.name = name
        this.displayName = displayName
        this.slug = slug
        this.creation_date = creation_date
        this.post = post
        this.action = action
        this.form = form
    }

    static get types(): StatEndpoint[] {
        return endpointsTypes;
    }

    async setup(post_id: string, settings: ListenerRequest['event'], api: Api): Promise<string | null> { return null }
}

export class StatEndpointCron extends StatEndpoint {
    type: string = 'cron'
    /**
     * @param {string} cron when the endpoint must be called
     */
    cron: string
    // * * * * *
    // - - - - -
    // | | | | |
    // | | | | +----- day of the week (0 - 6) (Sunday=0)
    // | | | +------- month (1 - 12)
    // | | +--------- day of the month (1 - 31)
    // | +----------- hour (0 - 23)
    // +------------- min (0 - 59)

    constructor(name: string, displayName: string, slug: string, creation_date: number, post: string, cron: string, action: Action, form: Component<LenraComponent>[]) {
        super(name, displayName, slug, creation_date, post, action, form)
        const currentDate = new Date()
        const firstCronDate = new Date(currentDate.getTime())
        firstCronDate.setHours(currentDate.getHours() + 1, currentDate.getMinutes() + 2)
        this.cron = cron
            .replace('m', firstCronDate.getMinutes().toString())
            .replace('h', firstCronDate.getHours().toString())
            .replace('d', firstCronDate.getDate().toString())
            .replace('M', firstCronDate.getMonth().toString())
            .replace('w', firstCronDate.getDay().toString())
    }

    async setup(post_id: string, settings: ListenerRequest['event'], api: Api) {
        const [post] = await api.data.coll(Post).find({
            _id: post_id
        })
        const [platform] = await api.data.coll(Platform).find({
            _id: post.platform
        })
        const cron_response = await fetch(`${api.url}/app-api/v1/crons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...api.data.headers()
            },
            body: JSON.stringify({
                listener: 'statsEndpoints',
                schedule: this.cron,
                props: {
                    post,
                    platform,
                    settings
                }
            })
        }).then((data) => data.json())
        return cron_response.uuid
    }
}

export class StatEndpointWebhook extends StatEndpoint {
    type: string = 'webhook'
    /**
     * @param {string} url The url to call the endpoint
     */
    url: string

    constructor(name: string, displayName: string, slug: string, creation_date: number, post: string, action: Action, form: Component<LenraComponent>[]) {
        super(name, displayName, slug, creation_date, post, action, form)
    }

    async setup(post_id: string, settings: ListenerRequest['event'], api: Api) {
        const [post] = await api.data.coll(Post).find({
            _id: post_id
        })
        const [platform] = await api.data.coll(Platform).find({
            _id: post.platform
        })
        const webhook_response = await fetch(new URL('/app-api/v1/webhooks', api.url), {
            method: 'POST',
            headers: {
              ...api.data.headers(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listener: 'statsEndpoints',
                props: {
                    post: post,
                    platform: platform,
                    settings
                }
            })
        }).then((data) => data.json())

        const url = new URL(`/apps/${APP_UUID}/webhooks/${webhook_response.uuid}`, api.url).toString()
        return url
    }
}


// fetch(new Request({
//     url: '',
//     body: '',
//     method: '',
//     headers: {}
// }))
export const endpointsTypes: StatEndpoint[] = [
    new StatEndpointCron("github", "GitHub", "github", null, null, 'm h * * *', async (props, _event, api) => {
        const { platform, post, settings } = props as {
            platform: Platform,
            post: Post,
            settings: ListenerRequest['event']
        }
        const url = new URL(post.url).pathname.split('/')
        const owner = url[1]
        const repository = url[2]
        const release = url[4] == 'tag' ? url[5] : url[4]
        const response = await fetch(new URL('https://api.github.com/graphql'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.token}`, 'X-REQUEST-TYPE': 'GraphQL' },
            body: `query {
    repository(owner:"${owner}", name:"${repository}") {
        release(tagName: ${release}) {
            releaseAssets(first: 100) {
                nodes {
                    name
                    downloadCount
                }
            }
        }
    }
}`
        } as RequestInit).then(data => data.json())
        const downloadCount = response?.data?.repository?.release?.releaseAssets?.nodes?.reduce((acc, value) => {
            if (!value.name.includes('docs')) {
                return acc + value.downloadCount
            }
            return acc
        }, 0)
        const currentDate = new Date()
        api.data.coll(PostStat).createDoc({
            slug: slugify(currentDate.toISOString()),
            date: currentDate.getTime(),
            clics: downloadCount
        } as PostStat)
    },
    [
        TextField('').name('token').style({
            decoration: {
                labelText: 'GitHub Token'
            }
        }),
    ] as Component<LenraComponent>[]),
    new StatEndpointCron("cargo", "Cargo", 'cargo', null, null, '0 0 * * *', (props, event, Api) => {

        },
        [
            TextField('')
        ] as Component<LenraComponent>[]
    ),
    new StatEndpointWebhook("ping", "Ping", 'ping', null, null, (props, event, Api) => {

        },
        [
            TextField('')
        ] as Component<LenraComponent>[]
    )
]
