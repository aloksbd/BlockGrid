var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

//board ratio of 450::670
let boardWidth = 450;
if (Math.floor((67 * width)/45) > height){
    boardWidth = Math.floor((45 * height)/67);
}else{
    boardWidth = width;
}
console.log(boardWidth,width);

let boardHeight = Math.floor((67 * boardWidth)/45);
let boardX = Math.floor(width/2) - Math.floor(boardWidth/2);
let boardY = Math.floor(height/2) - Math.floor(boardHeight/2);

let gridSize = 9;
let boxSize = boardWidth/gridSize;
let fontSize = boxSize;

function drawCanvas(){
    ctx.fillStyle = "#44dd99";
    ctx.fillRect(0,0,width,height);
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = 'hidden';
}