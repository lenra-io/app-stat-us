import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';
import Org, { Member } from '../classes/Org';

export default async function (props: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    const { org, member } = props
    const organisation = await api.data.coll(Org).getDoc(org as string)
    const members = organisation.members.filter(m => m.user != (member as Member).user)

    await api.data.coll(Org).updateMany({
        org: org
    }, {
        $set: {
            members: [...members, member]
        }
    })
}
