import { Data } from "@lenra/app";

export default class Navigation extends Data {
    state: any;
    history: any[];
    constructor(state: any, history: any[]) {
        super();
        this.state = state;
        this.history = history;
    }
}