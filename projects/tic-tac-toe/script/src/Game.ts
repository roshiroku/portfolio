import Board from "./Board.js";
import Cell from "./Cell.js";
import Player from "./Player.js";

export default class Game {
  active = false;
  readonly players;
  readonly board;
  protected _currentPlayer = 0;

  // Callback hooks
  onWin: (combo: Cell[]) => void = () => { };
  onTie: () => void = () => { };
  onSwitchPlayer: () => void = () => { };

  get currentPlayer() {
    return this.players[this._currentPlayer];
  }

  constructor(players: Player[], board: Board) {
    this.players = players;
    this.board = board;
  }

  start() {
    this.board.reset();
    this._currentPlayer = 0;
    this.active = true;
    this.onSwitchPlayer();
  }

  makeMove(i: number) {
    const cell = this.board.cells[i];

    if (!this.active || cell.value) return;

    cell.value = this.currentPlayer.symbol;

    const combo = this.checkWin();

    if (combo) {
      this.active = false;
      this.onWin(combo);
    } else if (this.checkTie()) {
      this.active = false;
      this.onTie();
    } else {
      this.nextPlayer();
      this.onSwitchPlayer();
    }

    return cell;
  }

  makeAIMove() {
    const availableCells = this.board.cells.filter(cell => !cell.value);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cell = availableCells[randomIndex];
    return this.makeMove(cell.index);
  }

  checkWin() {
    const combos = [...this.board.rows, ...this.board.cols, ...this.board.diagonals];
    return combos.find(combo => combo.every(cell => cell.value == this.currentPlayer.symbol));
  }

  checkTie() {
    return this.board.cells.every(cell => cell.value !== "");
  }

  nextPlayer() {
    this._currentPlayer = (this._currentPlayer + 1) % this.players.length;
  }
}