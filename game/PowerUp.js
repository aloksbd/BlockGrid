class PowerUp{
    x = 335;
    y = 585;
    color;
    shape;
    ctx;
    isPicked = false;
    boxSize = 50;

    constructor(ctx) {
        this.ctx = ctx;
        this.setup();
    }

    setup() {
        this.shape = POWERUP[0];
        this.color = 'white';
    }

    width(){
        return (this.shape.length * this.boxSize);
    }

    height(){
        return (this.shape.length * this.boxSize);
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = "#dddddd";
        if(this.isPicked){
            this.ctx.globalAlpha = 0.5;
        }
        this.ctx.fillRect(this.x , this.y  , this.boxSize, this.boxSize);
        this.ctx.strokeRect(this.x , this.y , this.boxSize, this.boxSize);
        if(this.isPicked){
            this.ctx.globalAlpha = 1;
        }
    }

    picked(mouseX,mouseY){
        this.x = mouseX - this.boxSize/2;
        this.y = mouseY - this.boxSize/2;
        this.isPicked = true;
    }

    drop(){
        this.x = 320;
        this.y = 570;
        this.isPicked = false;
    }
}