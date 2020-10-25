document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1400;
    canvas.height = 800;

    const background = new Image();
    background.src = "../assets/main-img/background.png";

    const playerSprite = new Image();
    playerSprite.src = "../assets/spritesheet/cuphead.png";

    const enemySprite1 = new Image();
    enemySprite1.src = "../assets/spritesheet/snail.png"
    
    const enemySprite2 = new Image();
    enemySprite2.src = "../assets/spritesheet/berserkie.png"

    const enemySprite3 = new Image();
    enemySprite3.src = "../assets/spritesheet/duku.png"

    const keys = [];

    const player = {
        x: 100,               // player's horizontal position on the x axis
        y: 600,               // player's vertical position on the y axis
        width: 103.0625,          // width is calculated based on what spritesheet we use
        height: 113.125,         // height is calculated based on what spritesheet we use
        frameX: 0,          // the horizontal coordinate of frame we cut out from our sprite sheet
        frameY: 3,          // the vertical coordinate of frame we cut out from our sprite sheet
        speed: 4,           // how many pixels we move per frame
        moving: false       // we will use this value to switch between standing and walking animation
    }

    const enemy1 = {
        x: 600,
        y: 580,
        width: 146.6,
        height: 133.2,
        frameX: 0,
        frameY: 0,
        speed: 4,
        moving: false
    }

    const enemy2 = {
        x: 850,
        y: 580,
        width: 154.3,
        height: 126,
        frameX: 0,
        frameY: 0,
        speed: 4,
        moving: false
    }

    const enemy3 = {
        x: 1160,
        y: 520,
        width: 232,
        height: 190,
        frameX: 0,
        frameY: 0,
        speed: 4,
        moving: false
    }
    
    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }   

    // Key Event Listeners 
    
    window.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;     // when a key is pressed that key is added to the keys array
        player.moving = true;
    });

    window.addEventListener("keyup", function(e) {
        delete keys[e.keyCode];     // when a key is released, that key is removed from the keys array
        player.moving = false;
    });

    // Player move playerSprite

    function movePlayer() {
        // Up
        if ((keys[38] || keys[87]) && player.y > 600) {
            player.y -= player.speed;
            player.frameY = 0;
            player.moving = true;
        }
        // Down
        if ((keys[40] || keys[83]) && player.y < canvas.height - player.height) {
            player.y += player.speed;
            player.frameY = 6;
            player.moving = true;
        }
        // Right
        if ((keys[39] || keys[68]) && player.x < canvas.width - player.width) {
            player.x += player.speed;
            player.frameY = 3;
            player.moving = true;
        }
        // Left
        if ((keys[37] || keys[65]) && player.x > 0) {
            player.x -= player.speed;
            player.frameY = 3;
            player.moving = true;
        }
        // Up-Right
        if ( ((keys[38] && keys[39]) || (keys[87] && keys[68])) && player.y > 600 && player.x < canvas.width - player.width) {
            player.frameY = 1;
            player.moving = true;
        }
        // Down-Right
        if ( ((keys[40] && keys[39]) || (keys[83] && keys[68])) && player.y < canvas.height - player.height && player.x < canvas.width - player.width) {
            player.frameY = 4;
            player.moving = true;
        }
    }

    // To trigger sprite walking animation frames
    
    function handlePlayerFrame() {
        if (player.frameX < 7 && player.moving) {    // because our spritesheet has four collumns, starting from 0
        player.frameX ++;
        }
        else {
            player.frameX = 0;
        }  
    }

    let fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimation(fps) {
        fpsInterval = 1000/fps;
        then = Date.now();
        startTime = then;
        animate();                                                                                                                                                                  
    }

    function animate() {
        requestAnimationFrame(animate);
        now = Date.now();
        elapsed = now - then;
        if (elapsed >fpsInterval) {
            then = now - (elapsed % fpsInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear entire canvas between every animation frame
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Player Sprite
            drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, 
            player.width, player.height, player.x, player.y, player.width, player.height);
            // Enemy Sprite 1 (Snail)
            drawSprite(enemySprite1, enemy1.width * enemy1.frameX, enemy1.height * enemy1.frameY, 
            enemy1.width, enemy1.height, enemy1.x, enemy1.y, enemy1.width, enemy1.height);
            // Enemy Sprite 2 (Ghost)
            drawSprite(enemySprite2, enemy2.width * enemy2.frameX, enemy2.height * enemy2.frameY, 
            enemy2.width, enemy2.height, enemy2.x, enemy2.y, enemy2.width, enemy2.height);
            // Enemy Sprite 3 (Tree)
            drawSprite(enemySprite3, enemy3.width * enemy3.frameX, enemy3.height * enemy3.frameY, 
            enemy3.width, enemy3.height, enemy3.x, enemy3.y, enemy3.width, enemy3.height);
            movePlayer();   // need to call this function to see the character move (defined below)
            handlePlayerFrame();
        }
    }

    startAnimation(30);

})