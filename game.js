let scoreBoard = null;
let board = null;
let spawnBoard = null;
let piece = null;
let currentPiece = null;
let powerUp = null;

let totalPowerUps = 0;
let powerUpScore = 0;

let gameover = false;

let playing = false;

function showHome(){
    drawCanvas();
    if (!loadComplete){
        setTimeout(showHome, 1000/30);
        console.log("not loaded");
    }else{
        console.log("loaded");
    ctx.drawImage(icon, width/2 - boxSize, height/2 - boxSize*3, boxSize*2, boxSize*2);
    ctx.drawImage(playImage, width/2 - boxSize*3/4, height/2 - boxSize*3/8, boxSize*3/2, boxSize*3/2);
    ctx.drawImage(audioOnImage, width/2 + boxSize, height/2, boxSize, boxSize);
    ctx.drawImage(leaderBoardImage, width/2 - boxSize*2, height/2, boxSize, boxSize);
    }
}
showHome();

function start(){
    scoreBoard = new ScoreBoard(ctx,boardX,boardY,boardWidth,scoreBoardHeight,fontSize);
    board = new Board(ctx,currentLevelGrid(),boardX,boardY + boxSize*2,gridSize,boxSize);  
    spawnBoard = new SpawnBoard(ctx,boardX,spawnBoardY,boardWidth,spawnBoardHeight);
    piece = new Piece(ctx,boardX,boardY,boxSize);
    currentPiece = new Piece(ctx,boardX,boardY,boxSize);
    currentPiece.makeCurrent();
    playing = true;
    bgMusic.play();
    draw();
}
// start();

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

function muteAudio(){
    AUDIO.forEach(audio => {
        audio.muted = true;
    });
}

function clickedInHome(mouseX,mouseY){
    if (mouseX > width/2 - boxSize*3/4 && 
        mouseX < width/2 - boxSize*3/4 + boxSize*3/2 && 
        mouseY > height/2 - boxSize*3/8 && 
        mouseY < height/2 - boxSize*3/8 + boxSize*3/2){
        start();
    }
    if (mouseX > width/2 + boxSize && 
        mouseX < width/2 + boxSize + boxSize && 
        mouseY > height/2 && 
        mouseY < height/2 + boxSize){
            if (!muted){
                ctx.drawImage(muteImage, width/2 + boxSize, height/2, boxSize, boxSize);
            }else{
                ctx.drawImage(audioOnImage, width/2 + boxSize, height/2, boxSize, boxSize);
            }
            muted = !muted;
            muteAudio();
    }
    if (mouseX > width/2 - boxSize*2 && 
        mouseX < width/2 - boxSize*2 + boxSize && 
        mouseY > height/2 && 
        mouseY < height/2 + boxSize){
            console.log("leaderBoard");
    }
}

document.onmousedown = function(mouse){
    let {mouseX,mouseY} = mouseXY(mouse);
    if (!playing){
        clickedInHome(mouseX,mouseY);
        return;
    }
    board.canPlace = false;
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
    if (!playing){return}
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
    if (!playing){return}
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