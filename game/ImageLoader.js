let totalImages = 0
let loadedImages = 0

function imageInPath(path) {
    let img = new Image();
    img.src = path;
    totalImages++;
    img.onload = function() {
        img_width = img.width;
        img_height = img.height;
    
        ctx.drawImage(img, 20, 20, img_width, img_height);
        console.log("asdasd");
    }
    return img
}

let icon = imageInPath("assets/icon.png");

let boardBlock = imageInPath("assets/board.png");

let block1 = imageInPath("assets/1.png");
let block2 = imageInPath("assets/2.png");
let block3 = imageInPath("assets/3.png");
let block4 = imageInPath("assets/4.png");
let block5 = imageInPath("assets/5.png");
let block6 = imageInPath("assets/6.png");
let block7 = imageInPath("assets/7.png");
let block8 = imageInPath("assets/8.png");
let block9 = imageInPath("assets/9.png");
let hammer = imageInPath("assets/10.png");


// ctx.globalAlpha = 0.5;