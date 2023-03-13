import { Board } from "./Board";
import { GameOutcomeResolver } from "./GameOutcome/GameOutcomeResolver";
import { GameResult } from "./GameOutcome/GameResult";
import { Piece } from "./Piece";
import { Player } from "./Player";
import { Position } from "./Position";

export class TicTacToeGame {
  private board: Board;
  private players: Player[] = [];
  private allowedPieces: Set<Piece>;
  private isInProgress = false;
  private gameOutcomeResolver: GameOutcomeResolver;

  private constructor(
    rowsCount: number,
    colsCount: number,
    gameOutcomeResolver: GameOutcomeResolver,
    allowedPieces: Set<Piece>
  ) {
    this.board = new Board(rowsCount, colsCount);
    this.allowedPieces = allowedPieces;
    this.gameOutcomeResolver = gameOutcomeResolver;
  }

  static create(
    rowsCount: number,
    colsCount: number,
    gameOutcomeResolver: GameOutcomeResolver,
    allowedPieces: Set<Piece> = new Set(Object.values(Piece) as Piece[])
  ): TicTacToeGame {
    // We will consider 3x3 the minimum size for the game
    if (rowsCount < 3 || colsCount < 3) {
      throw new Error("The minimum board size for this game is 3x3.");
    }

    return new TicTacToeGame(
      rowsCount,
      colsCount,
      gameOutcomeResolver,
      allowedPieces
    );
  }

  getPossiblePlays() {
    return this.board.getUnoccupiedPositions();
  }

  private getNextTurnPlayer(): Player {
    const player = this.players.shift() as Player;
    this.players.push(player);
    return player;
  }

  play(position: Position): GameResult {
    if (
      this.getPossiblePlays().filter(
        ({ row, col }) => position.row === row && position.col === col
      ).length === 0
    ) {
      throw new Error("You can't play this position.");
    }
    const { piece } = this.getNextTurnPlayer();
    this.board.fillCell(piece, position);

    return this.gameOutcomeResolver.getResult(this.board, piece, position);
  }

  startGame() {
    if (this.players.length < 2) {
      throw new Error("This game can't be played with less than 2 players.");
    }
    if (this.isInProgress) {
      throw new Error("You can't start an already started game");
    }
    this.isInProgress = true;
  }

  addPlayer(player: Player) {
    if (this.isInProgress) {
      throw new Error("You can't add players while during a game.");
    }

    if (!this.allowedPieces.has(player.piece)) {
      throw new Error(
        `There is already a registered player using "${player.piece}".`
      );
    }

    this.players.push({ ...player });
    this.allowedPieces.delete(player.piece);
  }
}
