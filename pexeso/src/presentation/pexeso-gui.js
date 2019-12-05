import {Pexeso} from "../domain/pexeso.js";
import {field} from "../domain/models/field.js";

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

        const table = document.createElement('table');

            for (let j = 0; j < this.game.columns; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = this._getIcon(j);
                cell.addEventListener('click', () => {
                    this.game.reveal(j);
                    this.draw();
                });
            }        

        this.container.appendChild(header);
        this.container.appendChild(smallHeader);
        this.container.appendChild(table);
    }

    createGameField(table) {
        for (let i = 0; i < this.game.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.game.columns; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = this._getIcon(i, j);
                cell.addEventListener('click', () => {
                    this.game.reveal(j, i);
                    this.draw();
                });
                cell.addEventListener('contextmenu', (e) => {
                    this.draw();
                    e.preventDefault()
                });

                row.appendChild(cell);
            }
            table.appendChild(row);
        }
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
     * @param {number} y
     * @return {string}
     * @private
     */
    _getIcon(x, y) {
        switch (this.game.getField(y, x)) {
            case 0:
                return '<div class="hidden">&nbsp;</div>';
            case 1:
                return `
                        <div class="empty">
                            ${this.game.getField(y, x).id}
                        </div>`;
            case 2:
                return `<div class="revealed">
                            ${this.game.getField(y, x).id}
                        </div>`;
        }
    }
}


