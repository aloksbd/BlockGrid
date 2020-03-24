class ScoreBoard{
    ctx;
    x = 0;
    y = 0;
    width = 450;
    height = 100;
    score = 0;
    level = 1;
    fontSize;

    constructor(ctx,x,y,width,height,fontSize){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fontSize = fontSize;
    }

    draw(){
        this.ctx.fillStyle = "#777777";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.strokeStyle = "#222222";
        this.ctx.strokeRect(this.x,this.y,this.width,this.height);
        this.drawScoreLabel();
        this.drawLevelLabel();
    }

    drawScoreLabel(){
        let x = this.x + Math.floor((this.fontSize*35)/50);
        let y = this.y + Math.floor((this.fontSize*35)/50);
        this.ctx.fillStyle = "#dd4499";
        ctx.font = Math.floor((this.fontSize*3)/5) + "px Arial";
        this.ctx.fillText("SCORE",x,y);
        ctx.font = this.fontSize + "px Arial";
        this.ctx.fillText(this.score,x,y + this.fontSize);
    }

    drawLevelLabel(){
        let x = this.x + Math.floor((this.width*32)/45);
        let y = this.y + Math.floor((this.fontSize*35)/50);
        this.ctx.fillStyle = "#dd4499";
        ctx.font = Math.floor((this.fontSize*3)/5) + "px Arial";
        this.ctx.fillText("LEVEL",x,y);
        ctx.font = this.fontSize + "px Arial";
        if (this.level > 9){
            x -= Math.floor(this.fontSize/2);
        }
        this.ctx.fillText(this.level,x+Math.floor((this.fontSize*65)/50),y + this.fontSize);
    }
}