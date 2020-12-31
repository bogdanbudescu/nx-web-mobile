export class Board {
    //Initializing the board
    public state = ['', '', '', '', '', '', '', '', '']
    constructor(state) {
        this.state = state;
    }

    //Checks if board has no symbols yet
    isEmpty() {
        return this.state.every(cell => !cell);
    }

    //Check if board has no spaces available
    isFull() {
        return this.state.every(cell => cell);
    }

    /**
     * Inserts a new symbol(x,o) into
     * @param {String} symbol 
     * @param {Number} position
     * @return {Boolean} boolean represent success of the operation
     */
    insert(symbol, position) {
        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
            throw new Error(`Cell index ${position} does not exist!`)
        }
        if (!['x', 'o'].includes(symbol)) {
            throw new Error('The symbol can only be x or o!')
        }
        if (this.state[position]) {
            return false;
        }
        this.state[position] = symbol;
        return true;
    }

    //Returns an array containing available moves for the current state
    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if (!cell) moves.push(index);
        });
        // let moves = this.state.filter(cell => !cell).map((v, i) => i);
        return moves;
    }

    /**
     * Checks if the board has a terminal state ie. a player wins or the board is full with no winner
     * @return {Object} an object containing the winner, direction of winning and row number
     */
    isTerminal() {
        //Return False if board in empty 
        if (this.isEmpty()) return false;
        //Checking Horizontal Wins
        if (this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return { 'winner': this.state[0], v: [1, 2, 0] };
        }
        if (this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return { 'winner': this.state[3] };
        }
        if (this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return { 'winner': this.state[6] };
        }

        //Checking Vertical Wins
        if (this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return { 'winner': this.state[0] };
        }
        if (this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return { 'winner': this.state[1] };
        }
        if (this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return { 'winner': this.state[2] };
        }

        //Checking Diagonal Wins
        if (this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return { 'winner': this.state[0] };
        }
        if (this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return { 'winner': this.state[2] };
        }

        //If no winner but the board is full, then it's a draw
        if (this.isFull()) {
            return { 'winner': 'draw' };
        }

        //return false otherwise
        return false;
    }
}