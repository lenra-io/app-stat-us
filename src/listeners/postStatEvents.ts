import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';
import { dateAndTimeStrToNumber, slugify } from '../utils/string';
import PostStat from '../classes/PostStat';
import Post from '../classes/Post';
import { StatEndpoint } from '../classes/StatEndpoint';

export async function onPostStatCreate({ post }: { post: Post }, event: ListenerRequest['event'], api: Api) {
    const [user] = await api.data.coll(User).find({id: '@me' })
    const endpoint = StatEndpoint.types.find((endpoint) => endpoint.name == user?.state?.['type'])
    if (endpoint) {
        // TODO: Create endpoint in Lenra (Webhook or Cron)
        const endpointWithId = await api.data.coll(StatEndpoint).createDoc({ ...endpoint, post: post._id, creation_date: Date.now(), endpoint: null, setup: undefined, form: undefined, displayName: undefined, action: undefined })
        const endpoint_response = await endpoint.setup(post._id, event.value as any, api)
        await api.data.coll(StatEndpoint).updateMany({ _id: endpointWithId._id }, { $set: { endpoint: endpoint_response } })
    } else {
        const dateTime = dateAndTimeStrToNumber(event.value['date'], event.value['time'])
        const slug = slugify(new Date(dateTime).toISOString())
        await api.data.coll(PostStat).createDoc({
            slug,
            post: post._id,
            date: dateTime,
            ...PostStat.fields.reduce((acc, field) => {
                return { ...acc, [field.name]: event.value[field.name] }
            }, {})
        } as unknown as PostStat);
    }
    await api.data.coll(User).updateMany({ id: '@me' }, { $unset: { state: '' } })
}

export async function onPostStatUpdate({ postStat, post }: { postStat: PostStat, post: Post }, event: ListenerRequest['event'], api: Api) {
    const dateTime = dateAndTimeStrToNumber(event.value['date'], event.value['time'])
    const slug = slugify(new Date(dateTime).toISOString())
    await api.data.coll(PostStat).updateMany({ _id: post._id }, { $set: {
        slug,
        post: post._id,
        date: dateTime,
        ...PostStat.fields.reduce((acc, field) => {
            return {...acc, [field.name]: event.value[field.name]}
        }, {})
    } as unknown as PostStat});
    await api.data.coll(User).updateMany({ id: '@me' }, { $unset: { state: '' } })
}

export async function onPostStatDelete(stat: PostStat, _event: ListenerRequest['event'], api: Api) {
    await api.data.coll(PostStat).deleteDoc(stat)
}
