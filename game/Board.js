class Board{
    ctx;
    x = 0;
    y = 100;
    row = 9;
    column = 9;
    boxSize = 50;
    boxRow = [];
    canPlace = false;
    wall;

    constructor(ctx,grid,wall) {
        this.ctx = ctx;
        this.setGrid(grid);
        this.wall = wall;
    }

    setGrid(grid){
        this.boxRow = [];
        grid.forEach(row => {
            this.boxRow.push(row.slice());
        });
    }

    draw(){
        for (var i = 0; i < this.row; i++ ){
            for (var j = 0; j < this.column; j++){
                if (this.boxRow[i][j] == 0){
                    this.ctx.fillStyle = "#777777";
                    this.ctx.strokeStyle = "#222222";
                }else{
                    this.ctx.fillStyle = COLORS[this.boxRow[i][j]];
                    this.ctx.strokeStyle = "#dddddd";
                }
                this.ctx.fillRect(j * (this.boxSize) + this.x,i * (this.boxSize) + this.y,this.boxSize,this.boxSize);
                this.ctx.strokeRect(j * (this.boxSize) + this.x,i * (this.boxSize) + this.y,this.boxSize,this.boxSize);
            }
        }
    }

    checkPlacebale(shape,mouseX,mouseY){
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize)-2;
        var place = false;
        if (x >= 0 && y >= 0 && x + shape[0].length <= this.row && y + shape.length <= this.column){
            place = true;
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
                            this.ctx.fillRect((j+x) * (this.boxSize),(i+y+2) * (this.boxSize),this.boxSize,this.boxSize);
                            this.ctx.globalAlpha = 1;
                            this.ctx.strokeStyle = "#ffffff";
                            this.ctx.strokeRect((j+x) * (this.boxSize),((i+y+2)) * (this.boxSize),this.boxSize,this.boxSize);
                        }
                    }
                }
            }
        }
        this.canPlace = place;
    }

    placePiece(shape,mouseX,mouseY){
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize)-2;
        if (this.canPlace){
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (shape[i][j] != 0){
                        this.boxRow[i+y][j+x] = shape[i][j];
                    }
                }
            }
            return this.checkRowColumnMatch(shape,x,y);
        }
        return 0;
    }

    checkRowColumnMatch(shape,x,y){
        var matchedCount = 0
        for (var i = 0; i < shape.length; i++ ){
            var match = true;
            let walls = 0;
            let weigthedGrid = [];
            this.boxRow.forEach(row => {
                weigthedGrid.push(row.slice());
            });
            for (var j = 0; j < this.column; j++){
                // console.log(i,j,y,this.boxRow[i+y][j]);
                if (this.boxRow[i+y][j] == 0){
                    match = false;
                    break;
                }
                if (this.boxRow[i+y][j] == 9){
                    walls++;
                }
                weigthedGrid[i+y][j] = 0
            }
            if (match){
                this.boxRow = weigthedGrid.slice();
                this.wall -= walls;
                matchedCount++;
            }
        }

        for (var j = 0; j < shape[0].length; j++){
            var match = true;
            let walls = 0;
            let weigthedGrid = [];
            this.boxRow.forEach(row => {
                weigthedGrid.push(row.slice());
            });
                // weigthedGrid.push(arrSrc[elm].slice());
            // let weigthedGrid = this.boxRow.slice();
            for (var i = 0; i < this.row; i++ ){
                // console.log(i,j,x,this.boxRow[i][j+x]);
                if (this.boxRow[i][j+x] == 0){
                    match = false;
                    break;
                }
                if (this.boxRow[i][j+x] == 9){
                    walls++;
                }
                weigthedGrid[i][j+x] = 0
            }
            if (match){
                this.boxRow = weigthedGrid.slice();
                this.wall -= walls;
                matchedCount++;
            }
        }
        return matchedCount;
    }
}