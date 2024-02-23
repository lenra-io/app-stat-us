import { Api, ListenerRequest } from '@lenra/app';
import User from '../classes/User';
import { Member, default as Org, Role as OrgRoles} from '../classes/Org';
import { slugify } from '../utils/string';

export async function onOrgCreate(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const org_name = event.value['name'] as string
    const existingOrgs = await api.data.coll(Org).find({
        slug: slugify(org_name)
    })

    if (existingOrgs.length > 0) {
        throw 'Org already exist'
    }

    await api.data.coll(Org).createDoc(new Org(
        org_name,
        slugify(org_name),
        [{ user: '@me', role: OrgRoles.OWNER }]
    ))
}
export async function onOrgUpdate(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const org_name = event.value as string
    const org = props.org as Org

    const existingOrgs = await api.data.coll(Org).find({
        slug: slugify(org_name)
    })

    if (existingOrgs.length > 0) {
        throw 'Org already exist'
    }

    await api.data.coll(Org).updateMany({ _id: org._id }, {
        $set: {
            name: org_name,
            slug: slugify(org_name)
        }
    })
}

export async function onOrgUpdateMumbers(props: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    const { org, member } = props
    const organisation = await api.data.coll(Org).getDoc(org as string)
    const members = organisation.members.filter(m => m.user != (member as Member).user)
    await api.data.coll(Org).updateMany({
        _id: org
    }, {
        $set: {
            members: [...members, member]
        }
    })
}

export async function onOrgInviteSearch(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const org = props.org as Org
    const username = event.value as string
    const users = await api.data.coll(User).find({
        username: { $regex: slugify(username) },
        id: {
            $nin: (props.org as Org).members.map((value)=>value.user)
        }
    })

    await api.data.coll(User).updateMany({ id: '@me' }, {
        $set: {
            state: {
                slug: `${org.slug}/invite`,
                users: users.map(user=>user.id)
            }
        }
    })
}
