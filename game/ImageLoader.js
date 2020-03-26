let totalImages = 0;
let loadedImages = 0;
let loadComplete = false;

function imageInPath(path) {
    let img = new Image();
    img.src = path;
    totalImages++;
    img.onload = function() {
        loadedImages++;
        if (totalImages == loadedImages){
            loadComplete = true;
        }
        console.log(totalImages,loadedImages,loadComplete)
    }
    return img
}

let icon = imageInPath("assets/icon.png");
let playImage = imageInPath("assets/play.png");
let audioOnImage = imageInPath("assets/audio.png");
let muteImage = imageInPath("assets/mute.png");
let leaderBoardImage = imageInPath("assets/leaderboard.png");

let backgroundImage = imageInPath("assets/background.png");

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