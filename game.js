let scoreBoard = null;
let board = null;
let spawnBoard = null;
let piece = null;
let currentPiece = null;
let powerUp = null;

let totalPowerUps = 0;
let powerUpScore = 0;

let gameover = false;

function start(){
    scoreBoard = new ScoreBoard(ctx,boardX,boardY,boardWidth,scoreBoardHeight,fontSize);
    board = new Board(ctx,currentLevelGrid(),boardX,boardY + boxSize*2,gridSize,boxSize);  
    spawnBoard = new SpawnBoard(ctx,boardX,spawnBoardY,boardWidth,spawnBoardHeight);
    piece = new Piece(ctx,boardX,boardY,boxSize);
    currentPiece = new Piece(ctx,boardX,boardY,boxSize);
    currentPiece.makeCurrent();
    draw();
}
start();

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

function mouseXY(mouse){
    let mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
    let mouseY = mouse.clientY - canvas.getBoundingClientRect().top;
    return {mouseX,mouseY};
}

document.onmousedown = function(mouse){
    bgMusic.play();
    let {mouseX,mouseY} = mouseXY(mouse);
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
    let {mouseX,mouseY} = mouseXY(mouse);
    if (currentPiece.isPicked){
        let matchedCount = board.placePiece(currentPiece.shape,mouseX-boardX-currentPiece.width()/2+currentPiece.boxSize/2,mouseY-boardY-currentPiece.height()/2+currentPiece.boxSize/2);
        scoreBoard.score += matchedCount;
        checkLevelClear();
        currentPiece.drop();
        if (matchedCount > 0){
            matchSound.play();
        }

        if (board.canPlace){
            placeSound.play();
            scoreBoard.score += currentPiece.score();
            currentPiece = piece;
            currentPiece.makeCurrent();
            draw();
            gameover = !board.canPlaceCurrentPiece(currentPiece.shape);
            if (gameover){
                bgMusic.pause();
                gameoverSound.play();
            }
            piece = new Piece(ctx,boardX,boardY,boxSize);
        }else{
            denySound.play();
        }
    }
    if (powerUp != null){
        if (powerUp.isPicked){
            let destroyedBox = board.usePowerUp(powerUp.shape,mouseX-boardX-powerUp.width()/2+powerUp.boxSize/2,mouseY-boardY-powerUp.height()/2+powerUp.boxSize/2);
            scoreBoard.score += destroyedBox;
            powerUp.drop();
            checkLevelClear();
            if (destroyedBox > 0){
                matchSound.play();
            }

            if (board.canPlace){
                draw();
                gameover = !board.canPlaceCurrentPiece(currentPiece.shape);
                if (gameover){
                    bgMusic.pause();
                    gameoverSound.play();
                }
                powerUp = null;
            }else{
                denySound.play();
            }
        }
    }
    createPowerUp();
    draw();
}

document.onmousemove = function (mouse) {
    let {mouseX,mouseY} = mouseXY(mouse);
    if (currentPiece.isPicked){
        currentPiece.picked(mouseX,mouseY);
        draw();
        board.checkPlacebale(currentPiece.shape,mouseX-boardX-currentPiece.width()/2+currentPiece.boxSize/2,mouseY-boardY-currentPiece.height()/2+currentPiece.boxSize/2,false);
    }
    if (powerUp != null){
        if (powerUp.isPicked){
            powerUp.picked(mouseX,mouseY);
            draw();
            board.checkPlacebale(powerUp.shape,mouseX-boardX-powerUp.width()/2+powerUp.boxSize/2,mouseY-boardY-powerUp.height()/2+powerUp.boxSize/2,true);
        }
    }
}

function checkLevelClear(){
    if (board.wall == 0){
        levelClearedSound.play();
        scoreBoard.score += scoreBoard.level * 5;
        scoreBoard.level++;
        if (scoreBoard.level % LEVELGRID.length == 1){
            scoreBoard.score += 1000;
        }
        board.setGrid(currentLevelGrid());
    }
}

function currentLevelGrid(){
    return LEVELGRID[(scoreBoard.level-1) % LEVELGRID.length]
}

function createPowerUp(){
    powerUpScore = (Math.floor(scoreBoard.level/20) + 1) * 20;
    if (Math.floor(scoreBoard.score/powerUpScore) > totalPowerUps){
        powerUp = new PowerUp(ctx,boardX,boardY,boxSize);
        totalPowerUps++;
    }
}