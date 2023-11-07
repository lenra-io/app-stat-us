import { Data } from "@lenra/app";

const types = [
    {
        "name": "brand",
        "displayName": "Brand content"
    },
    {
        "name": "dev",
        "displayName": "Developer content"
    },
    {
        "name": "expert",
        "displayName": "Expert content"
    },
    {
        "name": "fun",
        "displayName": "Fun content"
    }
];

export default class Post extends Data {
    platform: string;
    name: string;
    type: string;
    url: string;
    channel?: string;
    date: number;

    /**
     * @param {string} platform The platform id
     * @param {string} name The post name
     * @param {string} type The post type
     * @param {string} url The post page url
     * @param {string?} channel A specific channel on the platform where the post has been added (ex: subs Reddit)
     * @param {number} date The publication date and time
     */
    constructor(platform: string, name: string, type: string, url: string, channel: string, date: number) {
        super();
        this.platform = platform;
        this.name = name;
        this.type = type;
        this.url = url;
        this.channel = channel;
        this.date = date;
    }

    static get types() {
        return types;
    }

}
