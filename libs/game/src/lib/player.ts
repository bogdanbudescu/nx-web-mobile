import { Board } from './board';

export class Player {
    public nodesMap: any = new Map();
    public maxDepth: number = -1;
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }

    // getBestMove(board, maximizing = true, callback = (p) => { }, depth = 0) {
    //     //clear nodesMap if the function is called for a new move
    //     if (depth == 0) this.nodesMap.clear();

    //     // console.log(depth, this.nodesMap)

    //     //If the board state is a terminal one, return the heuristic value
    //     if (board.isTerminal() || depth === this.maxDepth) {
    //         if (board.isTerminal().winner === 'x') {
    //             return 100 - depth;
    //         } else if (board.isTerminal().winner === 'o') {
    //             return -100 + depth;
    //         }
    //         return 0;
    //     }
    //     if (maximizing) {
    //         //Initialize best to the lowest possible value
    //         let best = -100;
    //         //Loop through all empty cells
    //         board.getAvailableMoves().forEach(index => {
    //             //Initialize a new board with a copy of our current state 
    //             const child = new Board([...board.state]);
    //             //Create a child node by inserting the maximizing symbol x into the current empty cell
    //             child.insert('x', index);
    //             //Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
    //             const nodeValue = this.getBestMove(child, false, callback, depth + 1);
    //             //Updating best value
    //             best = Math.max(best, nodeValue);

    //             //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
    //             if (depth == 0) {
    //                 //Comma separated indices if multiple moves have the same heuristic value
    //                 const moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${index}` : index;
    //                 this.nodesMap.set(nodeValue, moves);
    //             }
    //         });
    //         //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
    //         if (depth == 0) {
    //             let returnValue;
    //             if (typeof this.nodesMap.get(best) == 'string') {
    //                 const arr = this.nodesMap.get(best).split(',');
    //                 const rand = Math.floor(Math.random() * arr.length);
    //                 returnValue = arr[rand];
    //             } else {
    //                 returnValue = this.nodesMap.get(best);
    //             }
    //             //run a callback after calculation and return the index
    //             callback(returnValue);
    //             return returnValue;
    //         }
    //         //If not main call (recursive) return the heuristic value for next calculation
    //         return best;
    //     }

    //     if (!maximizing) {
    //         //Initialize best to the highest possible value
    //         let best = 100;
    //         //Loop through all empty cells
    //         board.getAvailableMoves().forEach(index => {
    //             //Initialize a new board with a copy of our current state 
    //             const child = new Board([...board.state]);

    //             //Create a child node by inserting the minimizing symbol o into the current empty cell
    //             child.insert('o', index);

    //             //Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
    //             let nodeValue = this.getBestMove(child, true, callback, depth + 1);
    //             //Updating best value
    //             best = Math.min(best, nodeValue);

    //             //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
    //             if (depth == 0) {
    //                 //Comma separated indices if multiple moves have the same heuristic value
    //                 const moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + index : index;
    //                 this.nodesMap.set(nodeValue, moves);
    //             }
    //         });
    //         //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
    //         if (depth == 0) {
    //             let returnValue;
    //             if (typeof this.nodesMap.get(best) == 'string') {
    //                 const arr = this.nodesMap.get(best).split(',');
    //                 const rand = Math.floor(Math.random() * arr.length);
    //                 returnValue = arr[rand];
    //             } else {
    //                 returnValue = this.nodesMap.get(best);
    //             }
    //             //run a callback after calculation and return the index
    //             callback(returnValue);
    //             return returnValue;
    //         }
    //         //If not main call (recursive) return the heuristic value for next calculation
    //         return best;
    //     }
    // }

    getBestMove(board, maximizing = true, depth = 0) {
        //clear nodesMap if the function is called for a new move
        if (depth == 0) this.nodesMap.clear();

        //If the board state is a terminal one, return the heuristic value
        let result = board.isTerminal();
        if (result || depth === this.maxDepth) {
            let v = 0;
            if (result.winner === 'x') v = depth;
            if (result.winner === 'o') v = - depth;
            return v;
        }

        //Initialize best to the lowest possible value if maximizing otherwise highet possible value
        let best = maximizing ? -Infinity : Infinity;
        let availableMoves = board.getAvailableMoves();
        // console.log(availableMoves)
        //Loop through all empty cells
        for (let i = 0; i < availableMoves.length; i++) {
            const move = availableMoves[i]; // represent the available position
            //Initialize a new board with a copy of our current state 
            const child = new Board([...board.state]);
            //Create a child node by inserting the maximizing symbol x into the current empty cell
            child.insert(maximizing ? 'x' : 'o', move);

            const nodeValue = this.getBestMove(child, !maximizing, depth + 1);
            //Updating best value
            best = maximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);
            //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
            if (depth == 0) {
                //Comma separated indices if multiple moves have the same heuristic value
                const moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${move}` : move;
                this.nodesMap.set(nodeValue, moves);
            }
        }


        //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
        if (depth == 0) {
            let returnValue;
            if (typeof this.nodesMap.get(best) == 'string') {
                const arr = this.nodesMap.get(best).split(',');
                const rand = Math.floor(Math.random() * arr.length);
                returnValue = arr[rand];
            } else {
                returnValue = this.nodesMap.get(best);
            }
            //run a callback after calculation and return the index
            return returnValue;
        }
        //If not main call (recursive) return the heuristic value for next calculation
        return best;

    }
}