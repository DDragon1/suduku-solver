import { Board } from "../entities/board";
import * as ps from "./possibilities";
import * as el from "./elimination";

export function removePossibilies(b : Board) : boolean {
    return baseLogic(b, removePossibiliesFunctions())
}

export function step(b : Board) : boolean {
      return baseLogic(b, stepFunctions())
}

export function solve(b : Board) : boolean {
    let changed : boolean = true

    while (changed) {
        changed = baseLogic(b, solveFunctions())
    }

    console.log("finished run with " + changed)
    return changed
}

function baseLogic(b: Board, functions: ((b: Board) => boolean)[]): boolean {
    let changed = false
    for (const func of removePossibiliesFunctions()) {
        changed = func(b) || changed;
      }
    return changed
}

function solveFunctions() : ((b: Board) => boolean)[] {
    return [removePossibilies, step]
}

function removePossibiliesFunctions() : ((b: Board) => boolean)[] {
    return [ps.calculateRows, ps.calculateCols, ps.calculateBlocks]
}

function stepFunctions() : ((b: Board) => boolean)[] {
    return [el.eliminateRows, el.eliminateCols, el.eliminateBlocks]
}