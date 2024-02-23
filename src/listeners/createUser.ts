import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';
import { default as Org, Role as OrgRoles} from '../classes/Org';
import { slugify } from '../utils/string';

export default async function (props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const username = event.value['username'] as string
    const id = props.user as string
    const existingUser = await api.data.coll(User).find({
        $or: [{
            username
        }, {
            id
        }]
    })

    if (existingUser.length > 0) {
        if (existingUser.some(user => user.id == id)) {
            throw 'You already got an account.'
        } else if (existingUser.some(user => user.username == username)) {
            throw 'User already exist'
        }
    }

    const org = await api.data.coll(Org)
    .createDoc(new Org(username, slugify(username), [{user: id, role: OrgRoles.OWNER}]))

    await api.data.coll(User)
        .createDoc(new User(
            id,
            username,
            org._id
        ))
   }
