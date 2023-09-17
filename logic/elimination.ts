import { Board, BOARD_SIZE, BOARD_BLOCK } from "../entities/board";
import { Cell } from "../entities/cell";

export function eliminateRows(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        changed = changed || eliminateRow(b, i)
    }
    return changed
}

export function eliminateCols(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        changed = changed || eliminateCol(b, i)
    }
    return changed
}

export function eliminateBlocks(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_BLOCK; i++) {
        for (let j=0; j < BOARD_BLOCK; j++) {
            changed = changed || eliminateBlock(b, i, j)
        }
    }
    return changed
}

/* Private functions */
function eliminateRow (b : Board, row: number) : boolean {
    const status : Map<number, number> = new Map()
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        addOccurrenceByCell(b.board[row][i], status)
    }

    for (let [value,ocurr] of status) {
        if (ocurr === 1) {
            for (let i=0; i < BOARD_SIZE; i++) {
                if (checkAndUpdateCellWithOnlyOccurrnce(b.board[row][i], value)) {
                    changed = true
                    break
                }
            }
        }
    }
    return changed
}

function eliminateCol (b : Board, col: number) : boolean {
    const status : Map<number, number> = new Map()
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        addOccurrenceByCell(b.board[i][col], status)
    }

    for (let [value,ocurr] of status) {
        if (ocurr === 1) {
            for (let i=0; i < BOARD_SIZE; i++) {
                if (checkAndUpdateCellWithOnlyOccurrnce(b.board[i][col], value)) {
                    changed = true
                    break
                }
            }
        }
    }
    return changed
}

function eliminateBlock (b : Board, blockRow: number, blockCol: number) : boolean {
    const status : Map<number, number> = new Map()
    let changed : boolean = false

    for (let i = blockRow * BOARD_BLOCK; i < (blockRow + 1) * BOARD_BLOCK; i++) {
        for (let j = blockCol * BOARD_BLOCK; j < (blockCol + 1) * BOARD_BLOCK; j++) {
            addOccurrenceByCell(b.board[i][j], status)
        }
    }

    for (let [value,ocurr] of status) {
        if (ocurr === 1) {
            for (let i = blockRow * BOARD_BLOCK; i < (blockRow + 1) * BOARD_BLOCK; i++) {
                for (let j = blockCol * BOARD_BLOCK; j < (blockCol + 1) * BOARD_BLOCK; j++) {
                    if (checkAndUpdateCellWithOnlyOccurrnce(b.board[i][j], value)) {
                        changed = true
                        break
                    }
                }
            }
        }
    }
    return changed
}

function addOccurrenceByCell(cell: Cell, status : Map<number, number>) {
    if (!cell.value) {
        cell.possibilities.forEach( v => status.set(v, (status.get(v)?? 0) + 1))
    }
}

function checkAndUpdateCellWithOnlyOccurrnce(cell: Cell, value: number) : boolean {
    if (!cell.value && cell.possibilities.has(value)) {
        cell.value = value
        return true
    }
    return false
}