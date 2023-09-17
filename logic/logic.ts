import { Board } from "../entities/board";
import * as ps from "./possibilities";
import * as el from "./elimination";

export function run(b : Board) : boolean {
    let changed : boolean = true

    while (changed) {
        changed = ps.calculateRows(b) || ps.calculateCols(b) || ps.calculateBlocks(b)
        changed = changed || el.eliminateRows(b) || el.eliminateCols(b) || el.eliminateBlocks(b)
    }

    console.log("finished run with " + changed)
    //console.log(b.toString())
    return false
}