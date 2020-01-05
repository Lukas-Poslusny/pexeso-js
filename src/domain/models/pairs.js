export class pairs {
    constructor(pairPiece1, pairPiece2) {
        this.pairPiece1 = pairPiece1;
        this.pairPiece2 = pairPiece2;
    }

    isMatching() {
        return this.pairPiece1 == this.pairPiece2;
    }
}