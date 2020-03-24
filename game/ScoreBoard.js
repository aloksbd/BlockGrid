class ScoreBoard{
    ctx;
    x = 0;
    y = 0;
    width = 450;
    height = 100;
    score = 0;
    level = 1;

    constructor(ctx,x,y,width,height){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width,
        this.height = height
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
        let x = this.x + 35;
        let y = this.y + 35;
        this.ctx.fillStyle = "#dd4499";
        ctx.font = 30 + "px Arial";
        this.ctx.fillText("SCORE",x,y,150);
        ctx.font = 50 + "px Arial";
        this.ctx.fillText(this.score,x,y + 50,150);
    }

    drawLevelLabel(){
        let x = this.x + 320;
        let y = this.y + 35;
        this.ctx.fillStyle = "#dd4499";
        ctx.font = 30 + "px Arial";
        this.ctx.fillText("LEVEL",x,y,150);
        ctx.font = 50 + "px Arial";
        if (this.level > 9){
            x -= 25;
        }
        this.ctx.fillText(this.level,x+65,y + 50,150);
    }
}