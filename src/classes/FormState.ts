import { Data } from "@lenra/app"

export default class FormState extends Data {
    _user: string
    _slug: string
    [k: string]: unknown

    /**
     * @param {string} user The member of the organisation which own all rights on the organisation
     */
    constructor(user: string, slug?: string) {
        super()
        this._user = user
        this._slug = slug
    }
}
