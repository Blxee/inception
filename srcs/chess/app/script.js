
const NONE = ' '
const KING = '\u{265A}'
const QUEEN = '\u{265B}'
const ROOK = '\u{265C}'
const BISHOP = '\u{265D}'
const KNIGHT = '\u{265E}'
const PAWN = '\u{265F}'

const PLAYER_BLACK = '#000000';
const PLAYER_WHITE = '#ffffff';

class Piece {
  constructor(type, player) {
    this.type = type;
    this.player = player;
    this.domPiece = document.createElement('div');
    this.domPiece.textContent = this.type;
  }
}

class Cell {
  #content;

  constructor(i, j, board) {
    this.domCell = document.createElement('div');
    this.domCell.content = null;
    this.domCell.classList.add('cell', j % 2 == 0 ? 'even-cell' : 'odd-cell');
    this.domCell.setAttribute("data-id", i);
    this.domCell.addEventListener("click", (event) => board.handleClick(event, this));
  }


  get content() {
    return this.#content;
  }

  set content(content) {
    if (content instanceof Piece) {
      this.#content = content;
      this.domCell.appendChild(content.domPiece);
    }
  }
}


class Board {
  constructor() {
    this.grid = Array(8).fill(null).map(() => Array(8).fill(null));
    this.domBoard = document.getElementById('board');
    this.selected = null;


    for (let i = 0, j = 0; i < 8 * 8; i++, j++) {
      if (i % 8 == 0) {
        j++;
      }
      let cell = new Cell(i, j, this);
      this.domBoard.appendChild(cell.domCell);
      this.grid[i % 8][Math.trunc(i / 8)] = cell;
    }

    this.grid[0][0].content = new Piece(ROOK, "player");
    this.grid[1][0].content = new Piece(KNIGHT, "player");
    this.grid[2][0].content = new Piece(BISHOP, "player");
    this.grid[3][0].content = new Piece(QUEEN, "player");
    this.grid[4][0].content = new Piece(KING, "player");
    this.grid[5][0].content = new Piece(BISHOP, "player");
    this.grid[6][0].content = new Piece(KNIGHT, "player");
    this.grid[7][0].content = new Piece(ROOK, "player");

    this.grid[0][7].content = new Piece(ROOK, "player");
    this.grid[1][7].content = new Piece(KNIGHT, "player");
    this.grid[2][7].content = new Piece(BISHOP, "player");
    this.grid[3][7].content = new Piece(QUEEN, "player");
    this.grid[4][7].content = new Piece(KING, "player");
    this.grid[5][7].content = new Piece(BISHOP, "player");
    this.grid[6][7].content = new Piece(KNIGHT, "player");
    this.grid[7][7].content = new Piece(ROOK, "player");

    for (let i = 0; i < 8; i++) {
      this.grid[i][1].content = new Piece(PAWN, "player");
      this.grid[i][6].content = new Piece(PAWN, "player");
    }
  }

  handleClick(event, cell) {
    let i = parseInt(event.target.dataset.id);
    let [x, y] = [i % 8, Math.trunc(i / 8)];
    console.log(this);
    console.log(cell);
    // event.target.classList.remove('cell');
    // event.target.textContent = NONE;
    console.log(x, y);
  }
}



let board = new Board();

const body = document.querySelector("body");
const follower = document.createElement('h1');
body.appendChild(follower);
follower.textContent = "hello world";
follower.style.position = "absolute";

document.addEventListener('mousemove', (e) => {
  // e.pageX and e.pageY account for page scrolling
  const x = e.pageX;
  const y = e.pageY;

  // Dynamically update the position using translate
  follower.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
});
