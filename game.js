var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
ctx.fillStyle = "#44dd99";
ctx.fillRect(0,0,width,height);
document.body.style.margin = 0;
document.body.style.padding = 0;
// document.body.scrollTop = 0;
document.body.style.overflow = 'hidden';


