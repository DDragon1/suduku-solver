import { Board, BOARD_SIZE, BOARD_BLOCK } from "../entities/board"
import { Cell } from "../entities/cell"

export function calculateRows(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        changed = calculateRow(b, i) || changed
    }
    return changed
}

export function calculateCols(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        changed = calculateCol(b, i) || changed
    }
    return changed
}

export function calculateBlocks(b: Board) : boolean {
    let changed : boolean = false

    for (let i=0; i < BOARD_BLOCK; i++) {
        for (let j=0; j < BOARD_BLOCK; j++) {
            changed = calculateBlock(b, i, j) || changed
        }
    }
    return changed
}

/* Private functions */
function calculateRow(b: Board, row: number) : boolean {
    const existingValues: Set<number> = new Set()
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        if (b.board[row][i].value)
            existingValues.add(b.board[row][i].value?? 0)
    }
    
    for (let i=0; i < BOARD_SIZE; i++) {
        changed = cellCheck(b.board[row][i], existingValues, changed)
    }

    return changed
}

function calculateCol(b: Board, col: number) : boolean {
    const existingValues: Set<number> = new Set()
    let changed : boolean = false

    for (let i=0; i < BOARD_SIZE; i++) {
        if (b.board[i][col].value)
            existingValues.add(b.board[i][col].value?? 0)
    }
    
    for (let i=0; i < BOARD_SIZE; i++) {
        changed = cellCheck(b.board[i][col], existingValues, changed)
    }

    return changed
}

function calculateBlock(b: Board,  blockRow: number, blockCol: number) : boolean{
    const existingValues: Set<number> = new Set()
    let changed : boolean = false

    for (let i = blockRow * BOARD_BLOCK; i < (blockRow + 1) * BOARD_BLOCK; i++) {
        for (let j = blockCol * BOARD_BLOCK; j < (blockCol + 1) * BOARD_BLOCK; j++) {
            if (b.board[i][j].value)
                existingValues.add(b.board[i][j].value?? 0)
        }
    }
    
    for (let i =blockRow * BOARD_BLOCK; i < (blockRow + 1) * BOARD_BLOCK; i++) {
        for (let j =blockCol * BOARD_BLOCK; j < (blockCol + 1) * BOARD_BLOCK; j++) {
            changed = cellCheck(b.board[i][j], existingValues, changed)
        }
    }

    return changed
}

function cellCheck (cell : Cell, existingValues: Set<number>, changed: boolean) : boolean {
    if (!cell.value) {
        existingValues.forEach( v => changed = cell.possibilities.delete(v) || changed)
        if (cell.possibilities.size === 1)
            cell.possibilities.forEach(v => cell.value = v)
    }
    return changed
}