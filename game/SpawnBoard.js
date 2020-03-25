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
        this.drawBgBox();
    }

    drawBgBox(){
        this.ctx.fillStyle = "#000000";
        this.ctx.globalAlpha = 0.3;
        let x = this.x + Math.floor((this.height*42)/120);
        let y = this.y + Math.floor((this.height*20)/120);
        let size = Math.floor((this.height*80)/120);
        this.ctx.fillRect(x,y,size,size);
        this.ctx.globalAlpha = 1;
    }
}