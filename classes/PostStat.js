const Document = require('./Document.js');
const collection = "post_stats";

const fields = [
    "views",
    "shared",
    "likes",
    "comments",
    "clics",
    "visits",
]

module.exports = class PostStat extends Document {
    /**
     * @param {string} _id Doc id
     * @param {string} post The post id
     * @param {number} date The date of the stat recording
     * @param {number} views The number of views
     * @param {number} shared The number times the posts are shared (like retweets)
     * @param {number} likes The number likes
     * @param {number} comments The number comments
     * @param {number} clics The number clics on a link in the posts
     * @param {number} visits The number visitis of the profile from a given post
     */
    constructor(_id, post, date, views, shared, likes, comments, clics, visits) {
        super(_id);
        this.post = post;
        this.date = date;
        this.views = views;
        this.shared = shared;
        this.likes = likes;
        this.comments = comments;
        this.clics = clics;
        this.visits = visits;
    }

    static get collection() {
        return collection;
    }

    static get fields() {
        return fields;
    }
}