class SpawnBoard{
    ctx;
    x;
    y;
    width;
    height;

    constructor(ctx,x,y,width,height){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    draw(){
        this.ctx.fillStyle = "#777777";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.strokeStyle = "#222222";
        this.ctx.strokeRect(this.x,this.y,this.width,this.height);
    }
}