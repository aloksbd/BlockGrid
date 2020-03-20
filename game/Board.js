class Board{
    ctx;
    row = 9;
    column = 9;
    boxSize = 50;
    boxRow = [];
    canPlace = false;

    constructor(ctx) {
        this.ctx = ctx;
        for (var i = 0; i < this.row; i++ ){
            var boxColumn = [];
            for (var j = 0; j < this.column; j++){
                boxColumn[j] = 0;  //state: 0 = closed, 1 = opened, 2 = marked
            }
            this.boxRow[i] = boxColumn;
        }
    }

    draw(){
        for (var i = 0; i < this.row; i++ ){
            for (var j = 0; j < this.column; j++){
                if (this.boxRow[i][j] == 0){
                    this.ctx.fillStyle = "#777777";
                    this.ctx.fillRect(j * (this.boxSize),i * (this.boxSize),this.boxSize,this.boxSize);
                    this.ctx.strokeStyle = "#222222";
                    this.ctx.strokeRect(j * (this.boxSize),i * (this.boxSize),this.boxSize,this.boxSize);
                }else{
                    this.ctx.fillStyle = COLORS[this.boxRow[i][j]];;
                    this.ctx.fillRect(j * (this.boxSize),i * (this.boxSize),this.boxSize,this.boxSize);
                    this.ctx.strokeStyle = "#dddddd";
                    this.ctx.strokeRect(j * (this.boxSize),i * (this.boxSize),this.boxSize,this.boxSize);
                }
            }
        }
    }

    checkPlacebale(shape,mouseX,mouseY){
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize);
        var place = true;
        if (x >= 0 && y >= 0 &&x + shape[0].length <= this.row && y + shape.length <= this.column){
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (shape[i][j] * this.boxRow[i+y][j+x] != 0){
                        place = false;
                    }
                }
            }
            if (place){
                for (var i = 0; i < shape.length; i++ ){
                    for (var j = 0; j < shape[0].length; j++){
                        if (shape[i][j] != 0){
                            this.ctx.globalAlpha = 0.2;
                            this.ctx.fillStyle = "#ffffff";
                            this.ctx.fillRect((j+x) * (this.boxSize),(i+y) * (this.boxSize),this.boxSize,this.boxSize);
                            this.ctx.globalAlpha = 1;
                            this.ctx.strokeStyle = "#ffffff";
                            this.ctx.strokeRect((j+x) * (this.boxSize),((i+y)) * (this.boxSize),this.boxSize,this.boxSize);
                        }
                    }
                }
            }
        }
        this.canPlace = place;
    }

    placePiece(shape,mouseX,mouseY){
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize);
        if (this.canPlace){
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (shape[i][j] != 0){
                        this.boxRow[i+y][j+x] = shape[i][j];
                    }
                }
            }
        }
    }
}