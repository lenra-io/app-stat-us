import { Data } from "@lenra/app";
const collection = "post_stats";

const fields = [
    {
        name: "views",
        displayName: "Views",
        icon: "visibility",
    },
    {
        name: "likes",
        displayName: "Likes",
        icon: "thumb_up",
    },
    {
        name: "dislikes",
        displayName: "Dislikes",
        icon: "thumb_down",
        negative: true,
    },
    {
        name: "reposts",
        displayName: "Reposts",
        icon: "autorenew",
    },
    {
        name: "comments",
        displayName: "Comments",
        icon: "chat",
    },
    {
        name: "clics",
        displayName: "Clics on link",
        icon: "link",
    },
    {
        name: "visits",
        displayName: "Profile visits",
        icon: "account_circle",
    },
]

export default class PostStat extends Data {
    post: string;
    date: number;
    views: number;
    reposts: number;
    likes: number;
    comments: number;
    clics: number;
    visits: number;

    /**
     * @param {string} _id Doc id
     * @param {string} post The post id
     * @param {number} date The date of the stat recording
     * @param {number} views The number of views
     * @param {number} reposts The number times the posts are reposts (like retweets)
     * @param {number} likes The number likes
     * @param {number} comments The number comments
     * @param {number} clics The number clics on a link in the posts
     * @param {number} visits The number visitis of the profile from a given post
     */
    constructor(post: string, date: number, views: number, reposts: number, likes: number, comments: number, clics: number, visits: number) {
        super();
        this.post = post;
        this.date = date;
        this.views = views;
        this.reposts = reposts;
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