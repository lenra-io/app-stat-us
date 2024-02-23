import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';
import { default as Org, Role as OrgRoles} from '../classes/Org';
import { slugify } from '../utils/string';

export async function createUser(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const displayName = event.value['username'] as string
    const username = slugify(displayName)
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
    .createDoc(new Org(displayName, username, [{user: id, role: OrgRoles.OWNER}]))

    await api.data.coll(User)
        .createDoc(new User(
            id,
            username,
            displayName,
            org._id
        ))
}

export async function updateUser(props: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    const { id, ...userProps } = props
    await api.data.coll(User).updateMany({
        id: id
    }, { $set: userProps })
}
