export class field {
    constructor (state, id) {
        this.state = state; // 0 = hidden, 1 = in process, 2 = revelaved
        this.id = id;
    }
}