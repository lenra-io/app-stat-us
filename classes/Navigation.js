const Document = require('./Document.js');

module.exports = class Navigation extends Document {
    /**
     * @param {string} _id Doc id
     * @param {any} state The navigation state
     * @param {any[]} history 
     */
    constructor(_id, state, history) {
        super(_id);
        this.state = state;
        this.history = history;
    }
}