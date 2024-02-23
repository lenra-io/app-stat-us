import { Component, Data, TextField, ListenerHandler, ListenerRequest, Api } from "@lenra/app";
import { LenraComponent} from "@lenra/app/dist/lib/gen/response";

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

    async setup(settings: ListenerRequest['event'], api: Api): Promise<string | null> { return null }
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
        this.cron = cron
    }

    async setup(settings: ListenerRequest['event'], api: Api) {
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
                    post: this.post,
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

    async setup(settings: ListenerRequest['event'], api: Api) {
        const webhook_response = await fetch(new URL('/app-api/v1/webhooks', api.url), {
            method: 'POST',
            headers: {
              ...api.data.headers(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listener: 'statsEndpoints',
                props: {
                    post: this.post,
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
    new StatEndpointCron("github", "GitHub", "github", null, null, '0 0 * * *', async (props, _event, Api) => {
            const { owner, repository, token } = props.settings as {
                owner: string,
                repository: string,
                token: string
            }
            const response = await fetch(new URL('https://api.github.com/graphql'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'X-REQUEST-TYPE': 'GraphQL' },
                body: `query {
    repository(owner:"${owner}", name:"${repository}") {
        releases(first:100) {
            nodes {
                releaseAssets(first: 100) {
                    nodes {
                        name
                        downloadCount
                    }
                }
            }
        }
    }
}`
            } as RequestInit).then(data => data.json())
        
        },
        [
            TextField('').name('owser').style({
                decoration: {
                    labelText: 'Repository Owner/Org'
                }
            }),
            TextField('').name('repository').style({
                decoration: {
                    labelText: 'Repository name'
                }
            }),
            TextField('').name('token').style({
                decoration: {
                    labelText: 'GitHub Token'
                }
            }),
        ] as Component<LenraComponent>[],
    ),
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
