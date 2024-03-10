import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import {Board} from "./entities/board"
import * as logic from "./logic/logic";
const app: Express = express();
const port = 3001;
let board : Board

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/start', (req: Request, res: Response) => {
  try {
    board = new Board(req.body)
    res.send(board.toString());
  } catch(err) {
    res.status(400).send("Bad input: " + err)
  }
});

app.get('/board', (req: Request, res: Response) => {
  if (board)
    res.send(board.toString());
  else
    res.status(404).send('Please initialize the board.')
});

app.get('/removePossibilies', (req: Request, res: Response) => {
  logic.removePossibilies(board)  
  res.json(board)
});

app.get('/step', (req: Request, res: Response) => {
  logic.step(board)  
  res.json(board)
});

app.get('/solve', (req: Request, res: Response) => {
  logic.solve(board)  
  res.json(board)
});

app.listen(port, () => {
  console.log(`Sudoku solver app listening at http://localhost:${port}`);
  //let init: number[][] = []
  //board = new Board(getInput())
  //console.log("before calculations:")
  //console.log(board.toString())
  //logic.solve(board)
  //console.log(board.toString())
});

function getInput() : number[][] {
  return [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0], 
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
  ]
}