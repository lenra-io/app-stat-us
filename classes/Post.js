const Document = require('./Document.js');
const collection = "posts";

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

module.exports = class Post extends Document {
    /**
     * @param {string} _id Doc id
     * @param {string} platform The platform id
     * @param {string} name The post name
     * @param {string} type The post type
     * @param {string} url The post page url
     * @param {string?} channel A specific channel on the platform where the post has been added (ex: subs Reddit)
     * @param {number} date The publication date and time
     */
    constructor(_id, platform, name, type, url, channel, date) {
        super(_id);
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

    static get collection() {
        return collection;
    }
}