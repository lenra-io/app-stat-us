import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';

export default async function (props: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    const { id, ...userProps } = props
    await api.data.coll(User).updateMany({
        id: id
    }, { $set: userProps })
}
