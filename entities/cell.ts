export class Cell {
    value?: number
    possibilities: Set<number> = new Set()

    constructor(posSize: number, value?: number) {
        if (value)
            this.value = value
        else {
            for (let i=1; i <= posSize; i++) {
                this.possibilities.add(i)
            }
        }    
    }

    toString() {
        return this.value ?? 0
    }
}