import { Api, ListenerRequest } from '@lenra/app';
import Post from '../classes/Post';

export async function onPostCreate(post: Post, _event: ListenerRequest['event'], api: Api) {
    await api.data.coll(Post).createDoc(post);
}

export async function onPostUpdate(post: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    await api.data.coll(Post).updateMany({ _id: post._id }, post);
}
