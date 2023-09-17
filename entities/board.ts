import { Cell } from "./cell"

export const BOARD_SIZE : number = 9
export const BOARD_BLOCK : number = 3 // number of blocks per row/col

export class Board {
    board: Cell[][] = []

    constructor(init: number[][]) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = []
            for (let j=0; j< BOARD_SIZE; j++) {
                this.board[i][j] = new Cell(BOARD_SIZE, init[i]? init[i][j] : undefined)
            }
        }
    }

    toString() : string {
        let s: string = ""
        for (let i = 0; i < BOARD_SIZE; i++) { 
            for (let j=0; j< BOARD_SIZE; j++) {
                s += (this.board[i][j].value?? 0) + " "
            }
            s += "\n"
        }
        return s
    }
}