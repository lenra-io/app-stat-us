import { Api, ListenerRequest } from '@lenra/app';
import Post from '../classes/Post';
import User from '../classes/User';
import Platform from '../classes/Platform';
import { dateAndTimeStrToNumber, slugify } from '../utils/string';

export async function onPostCreate({post, platform}: {post: Post, platform: Platform}, event: ListenerRequest['event'], api: Api) {
    const [user] = await api.data.coll(User).find({ id: '@me' })
    const slug = slugify(event.value['name'])
    const dateTime = dateAndTimeStrToNumber(event.value['date'], event.value['time'])
    await api.data.coll(Post).createDoc(new Post(
        user.selectedOrg,
        platform._id,
        event.value['name'],
        slug,
        user?.state['type'],
        event.value['url'],
        event.value['channel'],
        dateTime,
    ));
    await api.data.coll(User).updateMany({ id: '@me' }, { $unset: { state: '' } })
}

export async function onPostUpdate({ post, platform }: { post: Post, platform: Platform }, event: ListenerRequest['event'], api: Api) {
    const [user] = await api.data.coll(User).find({ id: '@me' })
    const slug = slugify(event.value['name'])
    const date = (event.value['date'] as String).trim()
    const time = (event.value['time'] as String).trim()
    const dateTime = Date.parse(`${date} ${time}`)
    await api.data.coll(Post).updateMany({ _id: post._id }, {
        $set: {
            name: event.value['name'],
            slug: slug,
            type: user?.state['type'],
            url: event.value['url'],
            channel: event.value['channel'],
            date: dateTime,
        } as Post
    })
    await api.data.coll(User).updateMany({ id: '@me' }, { $unset: { state: '' } })
};
