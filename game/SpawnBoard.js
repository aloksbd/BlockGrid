class SpawnBoard{
    ctx;
    x = 0;
    y = 550;
    width = 450;
    height = 120;

    constructor(ctx){
        this.ctx = ctx;
    }

    draw(){
        this.ctx.fillStyle = "#777777";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.strokeStyle = "#222222";
        this.ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
}