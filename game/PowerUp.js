class PowerUp{
    x = 320;
    y = 570;
    color;
    shape;
    ctx;
    isPicked = false;
    boxSize = 80;

    constructor(ctx) {
        this.ctx = ctx;
        this.setup();
    }

    setup() {
        this.shape = POWERUP[0];
        this.color = 'white';
    }
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        if(this.isPicked){
            this.ctx.globalAlpha = 0.5;
            this.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value > 0) {
                    this.ctx.fillRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
                    this.ctx.strokeRect(this.x + x * this.boxSize, this.y + y * this.boxSize, this.boxSize, this.boxSize);
                    }
                });
            });
            this.ctx.globalAlpha = 1;
        }else{
                this.ctx.fillRect(this.x , this.y  , this.boxSize, this.boxSize);
                this.ctx.strokeRect(this.x , this.y , this.boxSize, this.boxSize);
        }
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
}