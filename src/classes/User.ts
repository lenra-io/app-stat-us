import { Data } from "@lenra/app";

export default class User extends Data {
    id: string
    username: string
    selectedOrg?: string
    state: {[k:string]: string}

    /**
     * @param {string} id The Lenra's User Id
     * @param {string} username The User's name
     * @param {string} selectedOrg The current org to show platform's stats from
     */
    constructor(id: string, username: string, selectedOrg?: string) {
        super()
        this.id = id
        this.username = username
        this.selectedOrg = selectedOrg
        this.state = {}
    }
}
