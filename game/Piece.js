class Piece{
    x;
    y;
    color;
    shape;
    ctx;
    typeId;
    boxSize = 10;
    current = false;
    isPicked = false;

    constructor(ctx) {
        this.ctx = ctx;
        this.setup();
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
        this.y = 450 + 60 - Math.floor(this.height() / 2);
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
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                this.ctx.fillRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
                this.ctx.strokeRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
                }
            });
        });
    }

    makeCurrent(){
        this.boxSize = 25;
        this.x = 287 - Math.floor(this.width() / 2);
        this.y = 450 + 60 - Math.floor(this.height() / 2);
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
        return Math.floor(Math.random() * (COLORS.length - 1) + 1);
    }
}