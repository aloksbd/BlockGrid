let scoreBoard = new ScoreBoard(ctx,boardX,boardY,boardWidth,boxSize*2,boxSize);

let board = new Board(ctx,LEVELGRID[scoreBoard.level-1],boardX,boardY + boxSize*2,boxSize);

let spawnBoard = new SpawnBoard(ctx,boardX,boardY + boxSize * 11,boardWidth,(boxSize*2) + (Math.floor((boxSize*2)/5)));

let piece = new Piece(ctx,boardX,boardY,boxSize);

let currentPiece = new Piece(ctx,boardX,boardY,boxSize);
currentPiece.makeCurrent();

let powerUp = null;
let totalPowerUps = 0;

let gameover = false;

function draw(){
    if (!gameover || powerUp != null){
        drawCanvas();
        scoreBoard.draw();
        board.draw();
        spawnBoard.draw();
        piece.draw();
        currentPiece.draw();
        if (powerUp != null){
           powerUp.draw();
        }
    }
}
draw();

document.onmousedown = function(mouse){
    var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
    var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
    if (!gameover){
        if (mouseX > currentPiece.x && 
            mouseX < currentPiece.x + currentPiece.width() && 
            mouseY > currentPiece.y && 
            mouseY < currentPiece.y + currentPiece.height()){
                currentPiece.picked(mouseX,mouseY);
        }
    }
    if (powerUp != null){
        if (mouseX > powerUp.x && 
            mouseX < powerUp.x + powerUp.width() && 
            mouseY > powerUp.y && 
            mouseY < powerUp.y + powerUp.height()){
                powerUp.picked(mouseX,mouseY);
        }
    }
    draw();
}

document.onmouseup = function (mouse) {
    if (currentPiece.isPicked){
        var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
        var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
        let matchedCount = board.placePiece(currentPiece.shape,mouseX-boardX-currentPiece.width()/2+currentPiece.boxSize/2,mouseY-boardY-currentPiece.height()/2+currentPiece.boxSize/2);
        scoreBoard.score += matchedCount;
        if (board.wall == 0){
            scoreBoard.score += scoreBoard.level * 5;
            scoreBoard.level++;
            if (scoreBoard.level % LEVELGRID.length == 1){
                scoreBoard.score += 1000;
            }
            board.setGrid(LEVELGRID[(scoreBoard.level-1) % LEVELGRID.length]);
        }
        currentPiece.drop();
        if (board.canPlace){
            scoreBoard.score += currentPiece.score();
            currentPiece = piece;
            currentPiece.makeCurrent();
            draw();
            gameover = !board.canPlaceCurrentPiece(currentPiece.shape);
            if (gameover){
                console.log("GAMEOVER");
            }
            piece = new Piece(ctx,boardX,boardY,boxSize);
        }
    }
    if (powerUp != null){
        if (powerUp.isPicked){
            var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
            var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
            let destroyedBox = board.destroyBlocks(powerUp.shape,mouseX-powerUp.width()/2+powerUp.boxSize/2,mouseY-powerUp.height()/2+powerUp.boxSize/2);
            scoreBoard.score += destroyedBox;
            powerUp.drop();
            console.log(board.wall);
            if (board.wall == 0){
                scoreBoard.score += scoreBoard.level * 5;
                scoreBoard.level++;
                if (scoreBoard.level % LEVELGRID.length == 1){
                    scoreBoard.score += 1000;
                }
                board.setGrid(LEVELGRID[(scoreBoard.level-1) % LEVELGRID.length]);
            }

            if (board.canPlace){
                draw();
                gameover = !board.canPlaceCurrentPiece(currentPiece.shape);
                if (gameover){
                    console.log("GAMEOVER");
                }
                powerUp = null;
            }
        }
    }
    if (Math.floor(scoreBoard.score/200) > totalPowerUps){
        powerUp = new PowerUp(ctx);
        totalPowerUps++;
    }
    draw();
}

document.onmousemove = function (mouse) {
    if (currentPiece.isPicked){
        var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
        var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
        currentPiece.picked(mouseX,mouseY);
        draw();
        board.checkPlacebale(currentPiece.shape,mouseX-boardX-currentPiece.width()/2+currentPiece.boxSize/2,mouseY-boardY-currentPiece.height()/2+currentPiece.boxSize/2);
    }
    if (powerUp != null){
        if (powerUp.isPicked){
            var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
            var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
            powerUp.picked(mouseX,mouseY);
            draw();
            board.checkPlacebale(powerUp.shape,mouseX-powerUp.width()/2+powerUp.boxSize/2,mouseY-powerUp.height()/2+powerUp.boxSize/2);
        }
    }
}