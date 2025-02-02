import { Injectable } from '@angular/core';
import { Board } from './board';
import { Player } from './player';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    public startingPlayer = 1;
    public maximizing;
    public board = new Board(['', '', '', '', '', '', '', '', '']);
    public player = new Player();
    public playerTurn = 0;
    public players = [{ value: 0, name: 'AI' }, { value: 1, name: 'Human' }];
    constructor() { }

    public newGame() {
        console.log("started new game")
        this.maximizing = this.startingPlayer;
        this.playerTurn = this.startingPlayer;
        this.player = new Player();
        this.board = new Board(['', '', '', '', '', '', '', '', '']);
        //If computer is going to start, choose a random cell as long as it is the center or a corner
        if (!this.startingPlayer) {
            const centerAndCorners = [0, 2, 4, 6, 8];
            const firstChoice = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
            const symbol = !this.maximizing ? 'x' : 'o';
            this.board.insert(symbol, firstChoice);
            this.playerTurn = 1; //Switch turns
        }
    }

    public hitCell(cellIndex) {
        if (this.board.isTerminal()) return false;
        var symbol = this.maximizing ? 'x' : 'o'; //Maximizing player is always 'x'
        //Update the Board class instance as well as the Board UI
        this.board.insert(symbol, cellIndex);

        //If it's a terminal move and it's not a draw, then human won
        let result = this.board.isTerminal();
        if (result) {
            alert('Winner is ' + (result).winner)
        }
        this.playerTurn = 0; //Switch turns

        //Get computer's best move and update the UI
        let bestPosition = this.player.getBestMove(this.board, !this.maximizing, 0) // main call for getBestMove
        console.log(bestPosition);
        console.log(this.player.myMap);
        var symbol = !this.maximizing ? 'x' : 'o';
        this.board.insert(symbol, parseInt(bestPosition));
        result = this.board.isTerminal();
        if (result) {
            alert('Winner is ' + (result).winner)
        }
        this.playerTurn = 1; //Switch turns
    }
}
