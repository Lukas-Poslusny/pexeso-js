import {field} from "./models/field.js";
import {pairs} from "./models/pairs.js";

export class Pexeso {
    /**
     * @param {[]} array
     * @param {number} columns
     */
    constructor(columns) {
        this.columns = columns;

        this.pair = new pairs(null, null);

        let maxId = this.columns/2;
        let idArray = [];
        for (let i = 0; i < maxId; i++) {
            idArray.push(i);
            idArray.push(i);
        }

        this.array = [];
        let tempArray = [];
        for (let i = 0; i < columns; i++) {
            let tempNum = Math.floor(Math.random() * idArray.length);
            tempArray.push(new field (0, idArray[tempNum]));
            idArray.splice(tempNum, 1);
        }
        this.array.push(tempArray);
        
        console.log(this.array);
    }

    isPairEqual() {
        return this.pairs.pairPiece1 === this.pairs.pairPiece2;
    }

    /**
     * Reveals the number behind the card.
     * @param {number} x
     */
    reveal(x) {
        if (this.pairs.pairPiece1 === null && this.pairs.pairPiece2 === null) {
            this.pairs.pairPiece1 = this.array[x].id;
            this.pairs.pairPiece1.state = 1;
        } else if (this.pairs.pairPiece2 === null) {
            this.pairs.pairPiece2 = this.array[x].id;
        }
        
        if (this.pairs.isPairEqual() = true) {
            for (let i = 0; i < this.columns; i++) {
                if (this.array[x] === this.pairs.pairPiece1) {
                    this.array[x].state = 2;
                }
            }
        }
        else {
            this.clearPair();
        }
        this.pairs.pairPiece1 = null;
        this.pairs.pairPiece2 = null;            
    }

    /**
     * Clears out both pieces of the pair
     * @param {number} x
     */
    clearPair() {
        for (let i = 0; i < columns; i++) {
            if (this.array[x].id === this.pairs.pairPiece1 || this.array[x].id === this.pairs.pairPiece2) {
                this.array[x].state = 0;
            }
        }
    }

    /**
     * Returns the current state of the field.
     * Fields can be: hidden or visible.
     * @param {number} x
     * @return {field}
     */
    getField(x) {
        return this.array[x];
    }

    didWin(x) {
        for (let i = 0; i < columns; i++) {
            if (this.array[x].state === 0)
                return false;
            else
                return true;
        }
    }
}