class ScoreBoard{
    ctx;
    x;
    y;
    width;
    height;
    score = 0;
    level = 1;
    valueFontSize;
    titleFontSize;
    font;
    fontColor;

    constructor(ctx,x,y,width,height,valueFontSize){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.valueFontSize = valueFontSize;
        this.titleFontSize = Math.floor((valueFontSize*3)/5);
        this.font = 'Arial';
        this.fontColor = '#dd4499';
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
        this.drawLabel('SCORE',this.score,'left');
    }

    drawLevelLabel(){
        this.drawLabel('LEVEL',this.level,'right');
    }

    drawLabel(title, value, align){
        let x = this.x + Math.floor((this.valueFontSize*35)/50); 
        let y = this.y + Math.floor((this.valueFontSize*35)/50);
        if (align == 'right'){
            x = this.x + this.width - Math.floor((this.valueFontSize*35)/50);
        }

        this.ctx.textAlign = align;
        this.ctx.fillStyle = this.fontColor;
        ctx.font = this.titleFontSize + "px " + this.font;
        this.ctx.fillText(title,x,y);
        
        ctx.font = this.valueFontSize + "px " + this.font;
        this.ctx.fillText(value,x,y + this.valueFontSize);
    }
}