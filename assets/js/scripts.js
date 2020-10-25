document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1400;
    canvas.height = 800;

    const keys = [];

    const player = {
        x: 0,               // player's horizontal position on the x axis
        y: 0,               // player's vertical position on the y axis
        width: 117.7857,          // width is calculated based on what spritesheet we use
        height: 113.125,         // height is calculated based on what spritesheet we use
        frameX: 0,          // the horizontal coordinate of frame we cut out from our sprite sheet
        frameY: 0,          // the vertical coordinate of frame we cut out from our sprite sheet
        speed: 9,           // how many pixels we move per frame
        moving: false       // we will use this value to switch between standing and walking animation
    }

    const playerSprite = new Image();
    playerSprite.src = "../assets/spritesheet/cuphead.png";
    
    const background = new Image();
    background.src = "../assets/main-img/background.png";
    
    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }   

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear entire canvas between every animation frame
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, 0, 0, player.width, player.height, 100, 600, player.width, player.height);
        requestAnimationFrame(animate);
    }

    animate();
})