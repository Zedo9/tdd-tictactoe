import { Cell } from "./Cell";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
  private board: Cell[][] = [];
  private unoccupiedPositions: Set<string> = new Set();

  constructor(rowsCount: number, colsCount: number) {
    for (let i = 0; i < rowsCount; i++) {
      this.board.push([]);
      for (let j = 0; j < colsCount; j++) {
        this.board[i].push(new Cell(i, j));
        this.unoccupiedPositions.add(JSON.stringify({ row: i, col: j }));
      }
    }
  }

  private positionIsOutOfBoard({ row, col }: Position) {
    return this.rowIndexIsOutOfBounds(row) || this.colIndexIsOutOfBounds(col);
  }

  fillCell(piece: Piece, position: Position) {
    if (this.positionIsOutOfBoard(position)) {
      throw new Error("This position is out of board bounds.");
    }

    const positionStr = JSON.stringify(position);
    this.unoccupiedPositions.delete(positionStr);
    this.board[position.row][position.col].setPiece(piece);
  }

  private rowIndexIsOutOfBounds(rowIndex: number) {
    return rowIndex > this.getRowsCount() || rowIndex < 0;
  }

  private colIndexIsOutOfBounds(colIndex: number) {
    return colIndex > this.getColsCount() || colIndex < 0;
  }

  getRowsCount() {
    return this.board.length;
  }

  getColsCount() {
    return this.board[0].length;
  }

  getRow(rowIndex: number): Cell[] {
    if (this.rowIndexIsOutOfBounds(rowIndex)) {
      throw new Error("This row index is out of board bounds.");
    }

    return this.board[rowIndex];
  }

  getColumn(colIndex: number): Cell[] {
    if (this.colIndexIsOutOfBounds(colIndex)) {
      throw new Error("This column index is out of board bounds.");
    }
    const col = [];
    for (const row of this.board) {
      col.push(row[colIndex]);
    }
    return col;
  }

  getDiagonals(position: Position): Cell[][] {
    if (this.positionIsOutOfBoard(position)) {
      throw new Error("This position is out of board bounds.");
    }

    const { row, col } = position;
    let rowIndex = row;
    let colIndex = col;

    const firstDiagonal = [];
    const secondDiagonal = [];

    // Find the first diagonal "\"
    // Go upwards
    firstDiagonal.push(this.board[row][col]);
    while (colIndex !== 0 && rowIndex !== 0) {
      rowIndex--;
      colIndex--;
      firstDiagonal.unshift(this.board[rowIndex][colIndex]);
    }
    rowIndex = row;
    colIndex = col;
    // Go downwards
    while (
      colIndex !== this.getColsCount() - 1 &&
      rowIndex !== this.getRowsCount() - 1
    ) {
      rowIndex++;
      colIndex++;
      firstDiagonal.push(this.board[rowIndex][colIndex]);
    }

    // Find the second diagonal "/"
    // Go upwards
    rowIndex = row;
    colIndex = col;
    secondDiagonal.push(this.board[row][col]);
    while (colIndex !== this.getColsCount() - 1 && rowIndex !== 0) {
      rowIndex--;
      colIndex++;
      secondDiagonal.unshift(this.board[rowIndex][colIndex]);
    }
    // Go downwards
    rowIndex = row;
    colIndex = col;
    while (colIndex !== 0 && rowIndex !== this.getRowsCount() - 1) {
      rowIndex++;
      colIndex--;
      secondDiagonal.push(this.board[rowIndex][colIndex]);
    }

    const diagonals = [firstDiagonal, secondDiagonal];
    return diagonals.filter((d) => d.length > 1);
  }

  getUnoccupiedPositions(): Position[] {
    return Array.from(this.unoccupiedPositions).map(
      (s) => JSON.parse(s) as Position
    );
  }
}
