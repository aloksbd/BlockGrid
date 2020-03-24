class Piece{
    boardX;
    boardY;
    x;
    y;
    color;
    shape;
    ctx;
    typeId;
    boxSize;
    blockSize = 10;
    next = true;
    current = false;
    isPicked = false;

    constructor(ctx,boardX,boardY,boxSize) {
        this.ctx = ctx;
        this.boardX = boardX;
        this.boardY = boardY;
        this.boxSize = boxSize;
        this.blockSize = boxSize/5;
        this.setup();
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

    setup() {
        this.typeId = this.randomTypeId();
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.setRotation();
        this.x = boardX + Math.floor((this.boxSize*82)/50) - Math.floor(this.width() / 2);
        this.y = boardY + this.boxSize*11 + Math.floor((this.boxSize*60)/50) - Math.floor(this.height() / 2);
    }

    setRotation(){
        let rotateTime = Math.floor(Math.random() * 4);
        for (let i = 0; i <= rotateTime; i++){
            this.rotateLeft();
        }
    }

    rotateLeft(array) {
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
        if (this.next){
            this.drawBgBox();
        }
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        if(this.isPicked){
            this.ctx.globalAlpha = 0.5;
        }
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                this.ctx.fillRect(this.x + x * this.blockSize, this.y + y * this.blockSize, this.blockSize, this.blockSize);
                this.ctx.strokeRect(this.x + x * this.blockSize, this.y + y * this.blockSize, this.blockSize, this.blockSize);
                }
            });
        });
        if(this.isPicked){
            this.ctx.globalAlpha = 1;
        }
    }

    drawBgBox(){
        this.ctx.fillStyle = "#000000";
        this.ctx.globalAlpha = 0.3;
        let x = this.boardX + Math.floor((this.boxSize*42)/50);
        let y = this.boardY + this.boxSize*11 + Math.floor((this.boxSize*2)/5);
        let size = Math.floor((this.boxSize*8)/5);
        this.ctx.fillRect(x,y,size,size);
        this.ctx.globalAlpha = 1;
    }

    makeCurrent(){
        this.blockSize = Math.floor(this.boxSize/2);
        this.x = boardX + Math.floor((this.boxSize*9)/2) - Math.floor(this.width() / 2);
        this.y =  this.boardY +  this.boxSize*11 + Math.floor((this.boxSize*60)/50) - Math.floor(this.height() / 2);
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