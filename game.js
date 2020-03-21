let scoreBoard = new ScoreBoard(ctx);

let board = new Board(ctx,LEVELGRID[scoreBoard.level-1]);

let spawnBoard = new SpawnBoard(ctx);

let piece = new Piece(ctx);

let currentPiece = new Piece(ctx);
currentPiece.makeCurrent();

function draw(){
    drawCanvas();
    scoreBoard.draw();
    board.draw();
    spawnBoard.draw();
    piece.draw();
    currentPiece.draw();
}
draw();

document.onmousedown = function(mouse){
    var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
    var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
    if (mouseX > currentPiece.x && 
        mouseX < currentPiece.x + currentPiece.width() && 
        mouseY > currentPiece.y && 
        mouseY < currentPiece.y + currentPiece.height()){
            currentPiece.picked(mouseX,mouseY);
            currentPiece.draw();
    }
}

document.onmouseup = function (mouse) {
    if (currentPiece.isPicked){
        var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
        var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
        let matchedCount = board.placePiece(currentPiece.shape,mouseX-currentPiece.width()/2,mouseY-currentPiece.height()/2);
        scoreBoard.score += matchedCount;
        if (board.wall == 0){
            scoreBoard.score += scoreBoard.level * 5;
            scoreBoard.level++;
            board.setGrid(LEVELGRID[(scoreBoard.level-1) % LEVELGRID.length]);
        }
        currentPiece.drop();
        if (board.canPlace){
            scoreBoard.score += currentPiece.score();
            currentPiece = piece;
            currentPiece.makeCurrent();
            piece = new Piece(ctx);
        }
        console.log(board)
        draw();
    }
}

document.onmousemove = function (mouse) {
    if (currentPiece.isPicked){
        var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
        var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
        currentPiece.picked(mouseX,mouseY);
        draw();
        board.checkPlacebale(currentPiece.shape,mouseX-currentPiece.width()/2,mouseY-currentPiece.height()/2);
    }
}