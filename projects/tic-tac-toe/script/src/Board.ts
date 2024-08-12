import Cell from "./Cell.js";
import Component from "./Component.js";
import { createElement } from "./utils.js";

export default class Board extends Component<"div"> {
  readonly size;
  readonly cells;

  get rows() {
    const rows: Cell[][] = [];

    for (let i = 0; i < this.size; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < this.size; j++) {
        row.push(this.cells[i * this.size + j]);
      }

      rows.push(row);
    }

    return rows;
  }

  get cols() {
    const cols: Cell[][] = [];

    for (let i = 0; i < this.size; i++) {
      const col: Cell[] = [];

      for (let j = 0; j < this.size; j++) {
        col.push(this.cells[i + j * this.size]);
      }

      cols.push(col);
    }

    return cols;
  }

  get diagonals() {
    const diagonals: Cell[][] = [[], []];

    // First diagonal (top-left to bottom-right)
    for (let i = 0; i < this.size ** 2; i += this.size + 1) {
      diagonals[0].push(this.cells[i]);
    }

    // Second diagonal (top-right to bottom-left)
    for (let i = this.size - 1; i < this.size ** 2 - 1; i += this.size - 1) {
      diagonals[1].push(this.cells[i]);
    }

    return diagonals;
  }

  constructor(size: number = 3) {
    super();
    this.size = size;
    this.cells = [];

    for (let i = 0; i < size ** 2; i++) {
      this.cells.push(new Cell(i));
    }
  }

  reset() {
    this.cells.forEach(cell => (cell.value = ""));
  }

  createElement() {
    const el = createElement("div", { id: "game-board" }, this.cells.map(cell => cell.el));
    return el;
  }
}