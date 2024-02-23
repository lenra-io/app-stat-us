import { Data } from "@lenra/app";

export enum Role {
    VIEWER = 0, // Can read post, platform, stats data
    EDITOR, // Can create/delete/update a post, platform, stats
    MODERATOR, // Can Invite user, ban user from an org
    ADMIN, // Can change role of lower member
    OWNER // Can delete the org (Only one owner per org)
}

export type Member = {user: string, role: Role}

export default class Org extends Data {
    name: string
    slug: string
    members: Member[]

    /**
     * @param {string} name The organisation name
     * @param {string[]} members The member list of the organisation
     */
    constructor(name: string, slug: string, members: Member[] = []) {
        super()
        this.name = name
        this.slug = slug
        this.members = members
    }
}
