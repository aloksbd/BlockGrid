class Piece{
    x;
    y;
    color;
    shape;
    ctx;
    typeId;
    boxSize = 50;

    constructor(ctx) {
        this.ctx = ctx;
        this.setup();
    }

    setup() {
        this.typeId = this.randomTypeId();
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
        this.setRotation();
    }

    setRotation(){
        let rotateTime = Math.floor(Math.random() * 4);
        for (let i = 0; i <= rotateTime; i++){
            this.rotate();
        }
    }

    rotate() {
        // Transpose matrix
        for (let y = 0; y < this.shape.length; ++y) {
          for (let x = 0; x < y; ++x) {
            [this.shape[x][y], this.shape[y][x]] = [this.shape[y][x], this.shape[x][y]];
          }
        }
    
        // Reverse the order of the columns.
        this.shape.forEach(row => row.reverse());
        return this;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                this.ctx.fillRect((this.x + x) * this.boxSize, (this.y + y) * this.boxSize, this.boxSize, this.boxSize);
                this.ctx.strokeRect((this.x + x) * this.boxSize, (this.y + y) * this.boxSize, this.boxSize, this.boxSize);
                }
            });
        });
    }

    randomTypeId(){
        return Math.floor(Math.random() * (COLORS.length - 1) + 1);
    }
}