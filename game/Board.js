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

    constructor(ctx,grid) {
        this.ctx = ctx;
        this.setGrid(grid);
    }

    setGrid(grid){
        this.boxRow = [];
        this.wall = 0;
        for (var i = 0; i < this.row; i++ ){
            let boxColumn = [];
            for (var j = 0; j < this.column; j++){
                boxColumn.push(grid[i][j]);
                if (grid[i][j] != 0){
                    this.wall++;
                }
            }
        }
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
            if (shape.length == 3 && shape[0].length == 3){
                place = true;
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
        var matchedCount = 0;
        var row = [];
        var column = [];
        for (var i = 0; i < shape.length; i++ ){
            var match = true;
            let walls = 0;
            for (var j = 0; j < this.column; j++){
                if (this.boxRow[i+y][j] == 0){
                    match = false;
                    break;
                }
                if (this.boxRow[i+y][j] == 9){
                    walls++;
                }
            }
            if (match){
                row.push(i+y);
                this.wall -= walls;
                matchedCount+=9;
            }
        }

        for (var j = 0; j < shape[0].length; j++){
            var match = true;
            let walls = 0;
            for (var i = 0; i < this.row; i++ ){
                if (this.boxRow[i][j+x] == 0){
                    match = false;
                    break;
                }
                if (this.boxRow[i][j+x] == 9){
                    walls++;
                }
            }
            if (match){
                column.push(j+x);
                this.wall -= walls;
                matchedCount+=9;
            }
        }
        console.log(row,column)
        row.forEach(i => {
            for (var j = 0; j < this.column; j++){
                this.boxRow[i][j] = 0;
            }
        });
        column.forEach(j => {
            for (var i = 0; i < this.row; i++){
                this.boxRow[i][j] = 0;
            }
        });
        if (this.wall == 0){
            for (var i = 0; i < this.row; i++ ){
                for (var j = 0; j < this.column; j++){
                    if (this.boxRow[i][j] != 0){
                        matchedCount++;
                    }
                }
            }
        }
        return matchedCount;
    }
    
    canPlaceCurrentPiece(shape){
        for (var y = 0; y <= this.row-shape.length; y++){
            for (var x = 0; x <= this.column-shape[0].length; x++){
                let canPlace = true;
                for (var i = 0; i < shape.length; i++ ){
                    for (var j = 0; j < shape[0].length; j++){
                        if (shape[i][j] * this.boxRow[i+y][j+x] != 0){
                            canPlace = false;
                            break;
                        }
                    }
                    if (!canPlace){
                        break;
                    }
                }
                if (canPlace){
                    return true;
                }
            }
        }
        return false;
    }

    destroyBlocks(shape,mouseX,mouseY){
        var destroyedBlocks = 0;
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize)-2;
        if (this.canPlace){
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (!this.boxRow[i+y][j+x] == 0){
                        destroyedBlocks++;
                    }
                    if (this.boxRow[i+y][j+x] == 9){
                        this.wall--;
                    }
                    this.boxRow[i+y][j+x] = 0;
                }
            }
        }
        return destroyedBlocks;
    }
}