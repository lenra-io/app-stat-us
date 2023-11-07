import { Data } from "@lenra/app";

const collection = 'platforms';

export default class Platform extends Data {
    name: string;
    color: number;
    url: string;
    account?: string;
    views: boolean;
    reposts: boolean;
    likes: boolean;
    comments: boolean;
    clics: boolean;
    visits: boolean;

    /**
     * @param {string} name The platform name
     * @param {number} color The platform color
     * @param {string} url The platform page url
     * @param {string?} account The account on the platform when useful (example multiple Twitter accoutns)
     * @param {boolean} views Manage the number views
     * @param {boolean} reposts Manage the number times the posts are reposts (like retweets)
     * @param {boolean} likes Manage the number likes
     * @param {boolean} comments Manage the number comments
     * @param {boolean} clics Manage the number clics on a link in the posts
     * @param {boolean} visits Manage the number visitis of the profile from a given post
     */
    constructor(name: string, color: number, url: string, account: string, views: boolean, reposts: boolean, likes: boolean, comments: boolean, clics: boolean, visits: boolean) {
        super();
        this.name = name;
        this.color = color;
        this.url = url;
        this.account = account;
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
}