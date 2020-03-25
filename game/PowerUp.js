class PowerUp{
    x;
    y;
    boardX;
    boardY;
    color;
    shape;
    ctx;
    isPicked = false;
    boxSize;

    constructor(ctx,boardX,boardY,boxSize) {
        this.ctx = ctx;
        this.boardX = boardX;
        this.boardY = boardY;
        this.boxSize = boxSize;
        this.setupShape();
        this.setupPosition();
    }

    setupPosition(){
        let boardWidth = this.boxSize*9;
        let spawnBoardY = this.boxSize*11;
        let rawX = Math.floor((boardWidth*335)/450);
        let rawY = spawnBoardY + Math.floor((boxSize*35)/50);
        this.x = boardX + rawX;
        this.y = boardY + rawY;
    }

    setupShape() {
        this.shape = POWERUP[0];
        this.color = 'white';
    }

    width(){
        return (this.shape[0].length * this.boxSize);
    }

    height(){
        return (this.shape.length * this.boxSize);
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        if(this.isPicked){
            this.ctx.globalAlpha = 0.5;
        }
        // this.ctx.fillRect(this.x , this.y  , this.boxSize, this.boxSize);
        // this.ctx.strokeRect(this.x , this.y , this.boxSize, this.boxSize);
                    let img = hammer;
                    ctx.drawImage(img, this.x , this.y , this.boxSize, this.boxSize);
        if(this.isPicked){
            this.ctx.globalAlpha = 1;
        }
    }

    picked(mouseX,mouseY){
        this.x = mouseX - this.boxSize/2;
        this.y = mouseY - this.boxSize/2;
        this.isPicked = true;
    }

    drop(){
        this.setupPosition();
        this.isPicked = false;
    }
}