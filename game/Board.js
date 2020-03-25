class Board{
    ctx;
    x;
    y;
    numberOfRows;
    numberOfColumns;
    boxSize;
    grid;
    canPlace = false;
    wall;

    constructor(ctx,grid,x,y,gridSize,boxSize) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.numberOfRows = gridSize;
        this.numberOfColumns = gridSize;
        this.boxSize = boxSize;
        this.setGrid(grid);
    }

    setGrid(grid){
        this.grid = [];
        this.wall = 0;
        for (var i = 0; i < this.numberOfRows; i++ ){
            let column = [];
            for (var j = 0; j < this.numberOfColumns; j++){
                column.push(grid[i][j]);
                if (grid[i][j] != 0){
                    this.wall++;
                }
            }
            this.grid.push(column);
        }
    }

    draw(){
        for (var i = 0; i < this.numberOfRows; i++ ){
            for (var j = 0; j < this.numberOfColumns; j++){
                if (this.grid[i][j] == 0){
                    this.ctx.fillStyle = "#777777";
                    this.ctx.strokeStyle = "#222222";
                }else{
                    this.ctx.fillStyle = COLORS[this.grid[i][j]];
                    this.ctx.strokeStyle = "#dddddd";
                }
                this.ctx.fillRect(j * (this.boxSize) + this.x,i * (this.boxSize) + this.y,this.boxSize,this.boxSize);
                this.ctx.strokeRect(j * (this.boxSize) + this.x,i * (this.boxSize) + this.y,this.boxSize,this.boxSize);
            }
        }
    }

    firstBlockPositionInRowAndColumn(mouseX,mouseY){
        var x = Math.floor(mouseX/this.boxSize);
        var y = Math.floor(mouseY/this.boxSize)-2;
        return {x,y};
    }

    shapeIsInsideBoard(x,y,shape){
        return (x >= 0 && y >= 0 && x+shape[0].length <= this.numberOfRows && y+shape.length <= this.numberOfColumns);
    }

    noObstacle(x,y,shape){
        for (var i = 0; i < shape.length; i++ ){
            for (var j = 0; j < shape[0].length; j++){
                if (shape[i][j] * this.grid[i+y][j+x] != 0){
                    return false;
                }
            }
        }
        return true;
    }

    showShadow(x,y,shape){
        for (var i = 0; i < shape.length; i++ ){
            for (var j = 0; j < shape[0].length; j++){
                if (shape[i][j] != 0){
                    this.ctx.globalAlpha = 0.2;
                    this.ctx.fillStyle = "#ffffff";
                    this.ctx.fillRect((j+x) * (this.boxSize) + this.x,(i+y) * (this.boxSize) + this.y,this.boxSize,this.boxSize);
                    this.ctx.globalAlpha = 1;
                    this.ctx.strokeStyle = "#ffffff";
                    this.ctx.strokeRect((j+x) * (this.boxSize)+ this.x,((i+y)) * (this.boxSize)+ this.y,this.boxSize,this.boxSize);
                }
            }
        }
    }

    checkPlacebale(shape,mouseX,mouseY,isPowerUp){
        let {x,y} = this.firstBlockPositionInRowAndColumn(mouseX,mouseY);
        let place = false;

        if (this.shapeIsInsideBoard(x,y,shape)){
            place = this.noObstacle(x,y,shape) || isPowerUp;
        }
        if (place){
            this.showShadow(x,y,shape);
        }

        this.canPlace = place;
    }

    placePiece(shape,mouseX,mouseY){
        if (this.canPlace){
            let {x,y} = this.firstBlockPositionInRowAndColumn(mouseX,mouseY);
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (shape[i][j] != 0){
                        this.grid[i+y][j+x] = shape[i][j];
                    }
                }
            }
            return this.rowColumnMatch(shape,x,y);
        }
        return 0;
    }

    checkMatch(length,initialPosition,checkColumn){
        let matchedLine = [];
        for (var i = 0; i < length; i++ ){
            var match = true;
            let walls = 0;
            for (var j = 0; j < this.numberOfColumns; j++){
                let row = i+initialPosition;
                let column = j;
                if (checkColumn){
                    row = j;
                    column = i+initialPosition;
                }
                if (this.grid[row][column] == 0){
                    match = false;
                    break;
                }
                if (this.grid[row][column] == 9){
                    walls++;
                }
            }
            if (match){
                matchedLine.push(i+initialPosition);
                this.wall -= walls;
            }
        }
        return matchedLine;
    }

    removeBlocksFrom(row,column){
        row.forEach(i => {
            for (var j = 0; j < this.numberOfColumns; j++){
                this.grid[i][j] = 0;
            }
        });
        column.forEach(j => {
            for (var i = 0; i < this.numberOfRows; i++){
                this.grid[i][j] = 0;
            }
        });
    }

    levelCleared(){
        return this.wall == 0;
    }

    levelClearedPoint(){
        let totalBlocks = 0;
        for (var i = 0; i < this.numberOfRows; i++ ){
            for (var j = 0; j < this.numberOfColumns; j++){
                if (this.grid[i][j] != 0){
                    totalBlocks++;
                }
            }
        }
        return totalBlocks;
    }

    rowColumnMatch(shape,x,y){
        let matchedCount = 0;
        let matchedRow = this.checkMatch(shape.length,y,false);
        let matchedColumn = this.checkMatch(shape[0].length,x,true);
        
        matchedCount += matchedRow.length*9 + matchedColumn.length*9;

        this.removeBlocksFrom(matchedRow,matchedColumn);

        if (this.levelCleared()){
            matchedCount += this.levelClearedPoint();
        }
        return matchedCount;
    }
    
    canPlaceCurrentPiece(shape){
        for (var y = 0; y <= this.numberOfRows-shape.length; y++){
            for (var x = 0; x <= this.numberOfColumns-shape[0].length; x++){
                let canPlace = true;
                for (var i = 0; i < shape.length; i++ ){
                    for (var j = 0; j < shape[0].length; j++){
                        if (shape[i][j] * this.grid[i+y][j+x] != 0){
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

    usePowerUp(shape,mouseX,mouseY){
        let destroyedBlocks = 0;
        let {x,y} = this.firstBlockPositionInRowAndColumn(mouseX,mouseY);
        if (this.canPlace){
            for (var i = 0; i < shape.length; i++ ){
                for (var j = 0; j < shape[0].length; j++){
                    if (!this.grid[i+y][j+x] == 0){
                        destroyedBlocks++;
                    }
                    if (this.grid[i+y][j+x] == 9){
                        this.wall--;
                    }
                    this.grid[i+y][j+x] = 0;
                }
            }
        }
        return destroyedBlocks;
    }
}