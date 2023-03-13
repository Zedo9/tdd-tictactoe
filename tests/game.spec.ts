import { XInARowWins } from "../src/GameOutcome/XInARowWins";
import { Piece } from "../src/Piece";
import { Player } from "../src/Player";
import { TicTacToeGame } from "../src/TicTacToeGame";

describe("A TicTacToe Game", () => {
  const gameOutcomeResolver = new XInARowWins(3);
  it.each([3, 5, 10, 20])(
    "All cells should be playable on initialization (%i rows and cols)",
    (size: number) => {
      const player1 = new Player(Piece.O);
      const player2 = new Player(Piece.X);
      const game = TicTacToeGame.create(size, size, gameOutcomeResolver);
      game.addPlayer(player1);
      game.addPlayer(player2);

      const playablePositions = game.getPossiblePlays();

      expect(playablePositions).toHaveLength(size * size);
    }
  );

  it("Should throw an error when started with less than 2 players", () => {
    const player1 = new Player(Piece.O);
    const game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
    game.addPlayer(player1);

    expect(() => game.startGame()).toThrowError(
      new Error("This game can't be played with less than 2 players.")
    );
  });

  it.each([
    { rows: 1, cols: 2, valid: false },
    { rows: 2, cols: 2, valid: false },
    { rows: 1, cols: 1, valid: false },
    { rows: 3, cols: 2, valid: false },
    { rows: 4, cols: 2, valid: false },
    { rows: 3, cols: 3, valid: true },
    { rows: 3, cols: 4, valid: true },
    { rows: 5, cols: 3, valid: true },
    { rows: 5, cols: 5, valid: true },
  ])(
    "Should only allow rows and cols greater than 3",
    ({ rows, cols, valid }) => {
      if (valid) {
        const game = TicTacToeGame.create(rows, cols, gameOutcomeResolver);
        expect(game).toBeDefined();
      } else {
        expect(() =>
          TicTacToeGame.create(rows, cols, gameOutcomeResolver)
        ).toThrowError(
          new Error("The minimum board size for this game is 3x3.")
        );
      }
    }
  );

  describe("startGame", () => {
    it("Should throw if the game is already started", () => {
      const player1 = new Player(Piece.O);
      const player2 = new Player(Piece.X);
      const game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.startGame();

      expect(() => {
        game.startGame();
      }).toThrowError();
    });
  });

  describe("play", () => {
    it("Should throw when a position can't be played", () => {
      const player1 = new Player(Piece.O);
      const player2 = new Player(Piece.X);

      const game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.startGame();

      game.play({ row: 0, col: 0 });
      expect(() => game.play({ row: 0, col: 0 })).toThrowError();
    });
  });

  describe("Players", () => {
    it("Should have distinct pieces", () => {
      const player1 = new Player(Piece.O);
      const player2 = new Player(Piece.O);
      const game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
      game.addPlayer(player1);

      expect(() => game.addPlayer(player2)).toThrowError(
        new Error(`There is already a registered player using "O".`)
      );
    });

    it("Can only be added before the game has started", () => {
      const player1 = new Player(Piece.O);
      const player2 = new Player(Piece.X);
      const player3 = new Player(Piece.Z);

      const game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
      game.addPlayer(player1);
      game.addPlayer(player2);
      game.startGame();

      expect(() => game.addPlayer(player3)).toThrowError(
        new Error("You can't add players while during a game.")
      );
    });
  });
});
