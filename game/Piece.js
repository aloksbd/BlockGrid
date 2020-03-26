class Piece{
    ctx;
    boardX;
    boardY;
    x;
    y;
    color;
    shape;
    typeId;
    boxSize;
    blockSize;
    next = true;
    current = false;
    isPicked = false;

    constructor(ctx,boardX,boardY,boxSize) {
        this.ctx = ctx;
        this.boardX = boardX;
        this.boardY = boardY;
        this.boxSize = boxSize;
        this.blockSize = boxSize/5;
        this.setupShape();
        this.setupPosition();
    }

    score(){
        let blockCount = 0;
        for (var i = 0; i < this.shape.length; i++ ){
            for (var j = 0; j < this.shape[0].length; j++){
                if (this.shape[i][j] != 0){
                    blockCount++;
                }
            }
        }
        return blockCount;
    }

    width(){
        return (this.shape[0].length * this.blockSize)
    }

    height(){
        return (this.shape.length * this.blockSize)
    }

    setupShape() {
        this.typeId = this.randomTypeId();
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.setRotation();
    }

    setupPosition(){
        let spawnX = Math.floor((this.boxSize*82)/50) - Math.floor(this.width()/2);
        let spawnBoardY = this.boxSize*11;
        let spawnY = spawnBoardY + Math.floor((this.boxSize*60)/50) - Math.floor(this.height()/2);
        this.x = boardX + spawnX;
        this.y = boardY + spawnY;
    }

    setRotation(){
        let rotateTime = Math.floor(Math.random() * 4);
        for (let i = 0; i <= rotateTime; i++){
            this.rotateLeft();
        }
    }

    rotateLeft() {
        var result = [];
        this.shape.forEach(function (a, i, aa) {
            a.forEach(function (b, j, bb) {
                result[j] = result[j] || [];
                result[j][aa.length - i - 1] = b;
            });
        });
        this.shape = result;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        if(this.isPicked){
            this.ctx.globalAlpha = 0.5;
        }
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    let rawX = x * this.blockSize;
                    let rawY = y * this.blockSize;
                    // this.ctx.fillRect(this.x + rawX, this.y + rawY, this.blockSize, this.blockSize);
                    // this.ctx.strokeRect(this.x + rawX, this.y + rawY, this.blockSize, this.blockSize);
                    let img = IMAGES[this.typeId];
                    ctx.drawImage(img, this.x + rawX, this.y + rawY, this.blockSize, this.blockSize);
                
                }
            });
        });
        if(this.isPicked){
            this.ctx.globalAlpha = 1;
        }
    }

    makeCurrent(){
        this.blockSize = Math.floor(this.boxSize/2);
        let rawX = Math.floor((this.boxSize*9)/2) - Math.floor(this.width() / 2);
        let spawnBoardY = this.boxSize*11;
        let rawY = spawnBoardY + Math.floor((this.boxSize*60)/50) - Math.floor(this.height()/2);
        this.x = this.boardX + rawX;
        this.y = this.boardY + rawY;
        this.next = false;
    }

    picked(mouseX,mouseY){
        this.blockSize = this.boxSize;
        this.x = mouseX - this.width()/2;
        this.y = mouseY - this.height()/2;
        this.isPicked = true;
    }

    drop(){
        this.isPicked = false;
        this.makeCurrent();
    }

    randomTypeId(){
        return Math.floor(Math.random() * (COLORS.length - 2) + 1);
    }
}