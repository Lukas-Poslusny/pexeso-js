import { field } from "./models/field.js";
import { pairs } from "./models/pairs.js";
import { piece } from "../domain/models/piece.js";

export class Pexeso {
    /**
     * @param {[]} array
     * @param {number} columns
     */
    constructor(columns) {
        this.columns = columns;

        this.piece1 = null; 
        let idArray = [];
        for (let i = 0; i < (columns * (columns/2)); i++) {
            idArray.push(i);
            idArray.push(i);
        }

        this.array = []; 
        for (let i = 0; i < (columns * columns); i++) {
            this.array.push(field.hidden);
        }
        console.log(this.array)

        this.pieceArray = []; 
        let tempArray = [];
        for (let i = 0; i < (columns * columns); i++) {
            let tempNum = Math.floor(Math.random() * idArray.length);
            this.pieceArray.push(new piece(idArray[tempNum], i));
            idArray.splice(tempNum, 1);
        }
    }

    /**
     * Checks if pair 1 = pair 2
     * @param {number} x
     */
    isPairEqual(x) {
        console.log(x);
        if (this.pieceArray[x].value == this.pieceArray[this.piece1].value) {
            return true
        } else
            return false;
    }


    /**
     * Reveals the number behind the card.
     * @param {number} x
     */
    reveal(x) {
        if ((this.piece1 == null) && (this.array[x] == field.hidden)) { //2) zakazano tady
            this.piece1 = this.pieceArray[x].id; //odted pouzivam id jako odkaz
            this.array[x] = field.visible;
        } else if (this.array[x] == field.hidden) {
            this.checkPairs(x);
        }
    }

    /**
     * Checks if values are equal
     * @param {*} x 
     */
    checkPairs(x) {
        if (this.isPairEqual(x)) {
            this.array[x] = field.visible;
            this.array[this.piece1] = field.visible;
            this.piece1 = null;
        } else this.clearPair(x);
    }

    /**
     * Clears out both pieces of the pair
     * @param {number} x
     */
    clearPair(x) {
        this.array[x] = field.hidden;
        this.array[this.piece1] = field.hidden;
        this.piece1 = null;
    }

    /**
     * Returns the current state of the field.
     * Fields can be: hidden or visible.
     * @param {number} x
     */
    getField(x) {
        return this.array[x];
    }

    /**
     * Checks if all tiles are shown
     * @param {number} x 
     */
    didWin(x) {
        for (let i = 0; i < this.columns; i++) {
            if (this.array(i) === field.hidden)
                return false;
            else
                return true;
        }
    }
}