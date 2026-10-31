
const NONE = ' '
const KING = '\u{265A}'
const QUEEN = '\u{265B}'
const ROOK = '\u{265C}'
const BISHOP = '\u{265D}'
const KNIGHT = '\u{265E}'
const PAWN = '\u{265F}'

const PLAYER_BLACK = 'var(--color-darkest)';
const PLAYER_WHITE = 'var(--color-lightest)';

class Piece {
  #type;

  constructor(type, player) {
    this.domPiece = document.createElement('div');
    this.type = type;
    this.player = player;
    this.hasMoved = false;
    this.lastMoveWas2Jump = false;
  }

  set type(value) {
    this.#type = value;
    this.domPiece.textContent = value;
  }

  get type() {
    return this.#type;
  }

  canMove([x1, y1], [x2, y2]) {
    const [diffX, diffY] = [Math.abs(x1 - x2), Math.abs(y1 - y2)];

    switch (this.type) {
      case KING:
        return (diffX <= 1 && diffY <= 1) || (diffX == 2 && diffY == 0);
      case QUEEN:
        return (diffX == 0 || diffY == 0) || (diffX == diffY);
      case ROOK:
        return diffX == 0 || diffY == 0;
      case BISHOP:
        return diffX == diffY;
      case KNIGHT:
        return (diffX == 1 && diffY == 2) || (diffX == 2 && diffY == 1);
      case PAWN:
        if (diffY == 1)
          return diffX <= 1;
        else if (diffY == 2 && !this.hasMoved)
          return diffX == 0;
        else
          return false;
    }
  }
}

class Cell {
  #content;

  constructor(i, j, board) {
    [this.x, this.y] = [i % 8, Math.trunc(i / 8)];
    this.domCell = document.createElement('div');
    this.domCell.content = null;
    this.domCell.classList.add('cell', j % 2 == 0 ? 'even-cell' : 'odd-cell');
    this.domCell.addEventListener("click", (event) => board.handleClick(event, this));

  }

  get content() {
    return this.#content;
  }

  set content(piece) {
    if (piece == null) {
      this.#content = piece;
      let child = this.domCell.lastElementChild;
      if (child) {
        child.remove();
      }
    } else if (piece instanceof Piece) {
      this.#content = piece;
      this.domCell.appendChild(piece.domPiece);
      this.domCell.style.color = piece.player;
    }
  }
}


class Board {
  constructor() {
    this.grid = Array(8).fill(null).map(() => Array(8).fill(null));
    this.turn = PLAYER_WHITE;
    this.domBoard = document.querySelector('#board');
    this.selectedCell = null;
    this.selectedPiece = null;
    this.selectedDom = document.querySelector('#selected');
    this.lastPieceMoved = null;
    document.addEventListener('mousemove', (event) => this.handleMove(event));

    for (let i = 0, j = 0; i < 8 * 8; i++, j++) {
      if (i % 8 == 0) {
        j++;
      }
      let cell = new Cell(i, j, this);
      this.domBoard.appendChild(cell.domCell);
      this.grid[i % 8][Math.trunc(i / 8)] = cell;
    }

    this.grid[0][0].content = new Piece(ROOK, PLAYER_BLACK);
    this.grid[1][0].content = new Piece(KNIGHT, PLAYER_BLACK);
    this.grid[2][0].content = new Piece(BISHOP, PLAYER_BLACK);
    this.grid[3][0].content = new Piece(QUEEN, PLAYER_BLACK);
    this.grid[4][0].content = new Piece(KING, PLAYER_BLACK);
    this.grid[5][0].content = new Piece(BISHOP, PLAYER_BLACK);
    this.grid[6][0].content = new Piece(KNIGHT, PLAYER_BLACK);
    this.grid[7][0].content = new Piece(ROOK, PLAYER_BLACK);

    this.grid[0][7].content = new Piece(ROOK, PLAYER_WHITE);
    this.grid[1][7].content = new Piece(KNIGHT, PLAYER_WHITE);
    this.grid[2][7].content = new Piece(BISHOP, PLAYER_WHITE);
    this.grid[3][7].content = new Piece(QUEEN, PLAYER_WHITE);
    this.grid[4][7].content = new Piece(KING, PLAYER_WHITE);
    this.grid[5][7].content = new Piece(BISHOP, PLAYER_WHITE);
    this.grid[6][7].content = new Piece(KNIGHT, PLAYER_WHITE);
    this.grid[7][7].content = new Piece(ROOK, PLAYER_WHITE);

    for (let i = 0; i < 8; i++) {
      this.grid[i][1].content = new Piece(PAWN, PLAYER_BLACK);
      this.grid[i][6].content = new Piece(PAWN, PLAYER_WHITE);
    }
  }

  selectPiece(cell) {
    let piece = cell.content;
    this.selectedCell = cell;
    this.selectedPiece = piece;
    this.selectedDom.appendChild(piece.domPiece.cloneNode(true));
    this.selectedDom.style.color = piece.player;
  }

  unselectPiece() {
    this.selectedCell = null;
    this.selectedPiece = null;
    let child = this.selectedDom.lastElementChild;
    if (child) {
      child.remove();
    }
  }

  swapTurn() {
    if (this.turn == PLAYER_BLACK) {
      this.turn = PLAYER_WHITE;
    } else {
      this.turn = PLAYER_BLACK;
    }
  }

  handleClick(event, cell) {
    if (cell.content && !this.selectedPiece && this.turn == cell.content.player) {
      this.selectPiece(cell);
    } else {
      if (this.selectedPiece && this.isValidMove(this.selectedPiece, this.selectedCell, cell)) {
        this.selectedCell.content = null;
        cell.content = null;
        cell.content = this.selectedPiece;
        this.selectedPiece.hasMoved = true;
        this.lastPieceMoved = this.selectedPiece;
        this.swapTurn();
      }
      this.unselectPiece();
    }
  }

  handleMove(event) {
    if (this.selectedPiece) {
      const x = event.pageX;
      const y = event.pageY;
      this.selectedDom.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    }
  }

  isTherePieceBetween(cell1, cell2) {
    let [x, y] = [cell1.x, cell1.y];
    const [targetX, targetY] = [cell2.x, cell2.y];
    let [dx, dy] = [0, 0];

    if (x < targetX)
      dx = 1;
    else if (x > targetX)
      dx = -1;

    if (y < targetY)
      dy = 1;
    else if (y > targetY)
      dy = -1;

    while (x != targetX || y != targetY) {
      const cell = this.grid[x][y];

      if (cell.content != null && ![cell1, cell2].includes(cell)) {
        return true;
      }

      x += dx;
      y += dy;
    }
    return false;
  }

  isValidMove(piece, fromCell, toCell) {
    const targetPiece = toCell.content;

    const fromPos = [fromCell.x, fromCell.y];
    const toPos = [toCell.x, toCell.y];

    if (!piece.canMove(fromPos, toPos)) {
      return false;
    }

    if (piece.type != KNIGHT && this.isTherePieceBetween(fromCell, toCell)) {
      return false;
    }

    if (piece.type == PAWN && !this.isValidPawnMove(piece, fromCell, toCell)) {
      return false;
    }

    if (piece.type == KING && !this.isValidKingMove(piece, fromCell, toCell)) {
      return false;
    }

    if (piece.type == PAWN && ((piece.player == PLAYER_WHITE && toCell.y == 0) || (piece.player == PLAYER_BLACK && toCell.y == 7))) {
      piece.type = QUEEN;
    }

    if (!targetPiece) {
      if (piece.type == PAWN)
        piece.lastMoveWas2Jump = Math.abs(toCell.y - fromCell.y) == 2;
      return true;
    }

    if (piece.player == targetPiece.player || targetPiece.type == KING) {
      return false;
    }

    return true;
  }

  isValidPawnMove(piece, fromCell, toCell) {
    let targetPiece = toCell.content;

    if (piece.player == PLAYER_WHITE && fromCell.y < toCell.y)
      return false;
    if (piece.player == PLAYER_BLACK && fromCell.y > toCell.y)
      return false;
    const [diffX, diffY] = [Math.abs(fromCell.x - toCell.x), Math.abs(fromCell.y - toCell.y)];
    if (targetPiece && diffX == 0)
      return false;
    if (!targetPiece && diffX == 1) {
      targetPiece = this.grid[toCell.x][fromCell.y].content;
      if (!targetPiece || targetPiece.player == piece.player || !targetPiece.lastMoveWas2Jump || targetPiece != this.lastPieceMoved)
        return false;
      else
        this.grid[toCell.x][fromCell.y].content = null;
    }
    return true;
  }

  isValidKingMove(piece, fromCell, toCell) {
    const diffX = toCell.x - fromCell.x;

    if (Math.abs(diffX) == 2) {
      const targetRookCell = this.grid[(diffX == 2) ? 7 : 0][fromCell.y];
      const targetRookPiece = targetRookCell.content;
      if (!targetRookPiece || this.isTherePieceBetween(fromCell, targetRookCell) || piece.hasMoved || targetRookPiece.hasMoved)
        return false;
      else {
        targetRookCell.content = null;
        const rookNewCell = this.grid[fromCell.x + (toCell.x > fromCell.x ? 1 : -1)][fromCell.y];
        rookNewCell.content = targetRookPiece;
      }
    }
    return true;
  }
}

let board = new Board();
