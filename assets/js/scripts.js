document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1400;
    canvas.height = 800;

    const keys = [];

    const player = {
        x: 100,               // player's horizontal position on the x axis
        y: 650,               // player's vertical position on the y axis
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
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        requestAnimationFrame(animate);
    }

    animate();

    // Key Event Listeners 

    window.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;     // when a key is pressed that key is added to the keys array
    });

    window.addEventListener("keyup", function(e) {
        delete keys[e.keyCode];     // when a key is released, that key is removed from the keys array
    });

    // Player move playerSprite

    function movePlayer() {
        // Up
        if ((keys[38] || keys[87]) && player.y > 600) {
            player.y -= player.speed;
        }
        // Down
        if ((keys[40] || keys[83]) && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
        // Right
        if ((keys[39] || keys[68]) && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
        // Left
        if ((keys[37] || keys[65]) && player.x > 0) {
            player.x -= player.speed;
        }
    }

    
})