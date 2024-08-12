import Player from "./Player.js";
import Board from "./Board.js";
import Game from "./Game.js";
const mode = ("mode" in window && window.mode) || "pvp";
const players = [new Player("X"), new Player("O")];
const board = new Board();
const game = new Game(players, board);
const elements = {
    game: document.getElementById("game"),
    feedback: document.getElementById("feedback"),
    resetBtn: document.getElementById("reset-button")
};
board.el.style.gridTemplateColumns = `repeat(${board.size}, 1fr)`;
elements.game.append(board.el);
elements.resetBtn.addEventListener("click", startGame);
// Set up the callbacks
game.onWin = (combo) => {
    combo.forEach(cell => cell.el.classList.add("cell-highlight"));
    elements.game.classList.add("game-over");
    elements.feedback.innerText = `Game Over: ${game.currentPlayer.symbol} wins!`;
};
game.onTie = () => {
    elements.feedback.innerText = "Game Over: It's a tie!";
};
game.onSwitchPlayer = () => {
    game.players.forEach(player => elements.game.classList.remove(`${player.symbol.toLowerCase()}-turn`));
    elements.feedback.innerText = `${game.currentPlayer.symbol}'s turn`;
    elements.game.classList.add(`${game.currentPlayer.symbol.toLowerCase()}-turn`);
};
// Initialize the game
startGame();
board.cells.forEach(cell => {
    cell.el.addEventListener("click", () => makeMove(cell));
});
function makeMove(cell) {
    const player = game.currentPlayer;
    if (game.makeMove(cell.index)) {
        cell.el.classList.add(`cell-${player.symbol.toLowerCase()}`);
        if (mode != "pvp" && game.active) {
            makeAIMove();
        }
    }
}
function makeAIMove() {
    const player = game.currentPlayer;
    const cell = game.makeAIMove();
    if (cell) {
        cell.el.classList.add(`cell-${player.symbol.toLowerCase()}`);
    }
}
function startGame() {
    elements.game.classList.remove("game-over");
    board.cells.forEach(cell => cell.el.classList.remove("cell-highlight", ...players.map(({ symbol }) => `cell-${symbol.toLowerCase()}`)));
    game.start();
    mode == "o" && makeAIMove();
}
