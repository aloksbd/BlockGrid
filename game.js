drawCanvas();

let board = new Board(ctx);
board.draw();

let spawnBoard = new SpawnBoard(ctx);
spawnBoard.draw();

let piece = new Piece(ctx);
piece.draw();

let currentPiece = new Piece(ctx);
currentPiece.makeCurrent();
currentPiece.draw();