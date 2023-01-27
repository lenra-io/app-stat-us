const Document = require('./Document.js');
const collection = "posts";

module.exports = class Post extends Document {
    /**
     * @param {string} _id Doc id
     * @param {string} platform The platform id
     * @param {string} name The platform name
     * @param {string} url The platform page url
     * @param {string?} channel A specific channel on the platform where the post has been added (ex: subs Reddit)
     * @param {number} date The publication date and time
     */
    constructor(_id, platform, name, url, channel, date) {
        super(_id);
        this.platform = platform;
        this.name = name;
        this.url = url;
        this.channel = channel;
        this.date = date;
    }

    static get collection() {
        return collection;
    }
}