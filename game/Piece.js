class Piece{
    x;
    y;
    color;
    shape;
    ctx;
    typeId;
    boxSize = 10;
    next = true;
    current = false;
    isPicked = false;

    constructor(ctx) {
        this.ctx = ctx;
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
        return (this.shape[0].length * this.boxSize)
    }

    height(){
        return (this.shape.length * this.boxSize)
    }

    setup() {
        this.typeId = this.randomTypeId();
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.setRotation();
        this.x = 82 - Math.floor(this.width() / 2);
        this.y = 550 + 60 - Math.floor(this.height() / 2);
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
                this.ctx.fillRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
                this.ctx.strokeRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
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
        this.ctx.fillRect(42,570,80,80);
        this.ctx.globalAlpha = 1;
    }

    makeCurrent(){
        this.boxSize = 25;
        this.x = 225 - Math.floor(this.width() / 2);
        this.y = 550 + 60 - Math.floor(this.height() / 2);
        this.next = false;
    }

    picked(mouseX,mouseY){
        this.boxSize = 50;
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