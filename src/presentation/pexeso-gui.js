import { Pexeso } from "../domain/pexeso.js";
import { field } from "../domain/models/field.js";
import { piece } from "../domain/models/piece.js";

export class PexesoGUI {

    /**
     * @param {HTMLElement} container
     * @param {number} columns
     */
    constructor(container, columns) {
        this.container = container;
        this.game = new Pexeso(columns);
    }

    /**
     * Generates the UI grid
     */
    draw() {
        this._clear();

        const container = document.createElement('div');
        const header = document.createElement('h2');
        const smallHeader = document.createElement('h3');

        smallHeader.innerHTML = `Pairs left: ${this.game.pair}`;
        header.innerHTML = `Game is (<span class="orange">In Progress</span>)`;

        const table = document.createElement('div');
        let num = 0;
        for (let i = 0; i < this.game.columns * this.game.columns; i++) {
            const cell = document.createElement('span');
            const newColumn = document.createElement('tr');
            if(num == 4){
                table.appendChild(newColumn);
                num = 0;
            }
            num++;
            cell.innerHTML = this._getIcon(i);
            cell.addEventListener('click', () => {
                this.game.reveal(i);
                this.draw();
            }); 
            table.appendChild(cell);

        }
        this.container.appendChild(header);
        this.container.appendChild(table);
    }

    /**
     * Clears the game "canvas"
     * @private
     */
    _clear() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

    /**
     * Selects the correct icon/number and returns it
     * @param {number} x
     * @return {string}
     */
    _getIcon(x) {
        switch (this.game.getField(x)) {
            case field.hidden:
                return '<div class="hidden">&nbsp;</div>';
            case field.visible:
                return this.game.pieceArray[x].value;
        }
    }
}