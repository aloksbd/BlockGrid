class Board{
    ctx;
    row = 9;
    column = 9;
    boxSize = 50;
    boxRow = [];

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(){
        for (var i = 0; i < this.row; i++ ){
            var boxColumn = [];
            for (var j = 0; j < this.column; j++){
                boxColumn[j] = {item: ' ', state: 0};  //state: 0 = closed, 1 = opened, 2 = marked
                this.ctx.fillStyle = "#777777";
                this.ctx.fillRect(i * (this.boxSize),j * (this.boxSize),this.boxSize,this.boxSize);
                this.ctx.strokeStyle = "#222222";
                this.ctx.strokeRect(i * (this.boxSize),j * (this.boxSize),this.boxSize,this.boxSize);
            }
            this.boxRow[i] = boxColumn;
        }
    }
}