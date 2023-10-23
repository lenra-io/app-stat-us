import { Data } from '@lenra/app';

export default class Navigation extends Data {
    /**
     * @param {any} state The navigation state
     * @param {any[]} history
     */
    constructor(state, history) {
        this.state = state;
        this.history = history;
    }
}
