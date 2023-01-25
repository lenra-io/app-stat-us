const Document = require('./Document.js');

module.exports = class Game extends Document {
    /**
     * @param {string} _id Doc id
     * @param {number} difficulty The game difficulty index
     * @param {number} playerNumber number of players of the game
     * @param {number} firstPlayer Id of the player that play first
     * @param {number} lastPlayer Id of the last player
     * @param {number} lastPlayDate Timestamp of the last play
     * @param {boolean} finished if true, the game is finished
     * @param {number} winner Id of game winner
     */
    constructor(_id, difficulty, playerNumber, firstPlayer, lastPlayer, lastPlayDate, finished, winner) {
        super(_id);
        this.difficulty = difficulty;
        this.playerNumber = playerNumber;
        this.firstPlayer = firstPlayer;
        this.lastPlayer = lastPlayer;
        this.lastPlayDate = lastPlayDate;
        this.finished = finished;
        this.winner = winner;
    }
}