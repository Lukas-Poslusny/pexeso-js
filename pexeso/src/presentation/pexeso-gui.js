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

        smallHeader.innerHTML = `Pairs left: ${this.game.pair}`;
        header.innerHTML = `Game is (<span class="orange">In Progress</span>)`;   

        const div = document.createElement('div');

        this.createGameField(div);
        this.container.appendChild(header);
        this.container.appendChild(smallHeader);
        this.container.appendChild(div);
    }

    createGameField(div) {
        for (let y = 0; y < this.game.columns; y++) {
            const column = document.createElement('td');

            for (let i = 0; i < this.game.columns; i++) {
                const cell = document.createElement('span');
                cell.innerHTML = this._getIcon(i);
                cell.addEventListener('click', () => {
                    this.game.reveal(i);
                    this.draw();
                });
                cell.addEventListener('contextmenu', (e) => {
                    this.draw();
                    e.preventDefault()
                });
                
                div.appendChild(cell);                
            }
            div.appendChild(column);
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
     * @return {string}
     * @private
     */
    _getIcon(x, y) {
        switch (this.game.getField(x)) {
            case 0:
                return `<div class="hidden">&nbsp;</div>`;
            case 1:
                return `
                        <div class="empty">
                            ${this.game.getField(x).id}
                        </div>`;
            case 2:
                return `<div class="revealed">
                            ${this.game.getField(x).id}
                        </div>`;
        }
    }
}