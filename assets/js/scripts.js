document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1400;
    canvas.height = 800;

    const keys = [];
    
    const background = new Image();
    background.src = "../assets/main-img/background.png";
    
    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }   

    function animate() {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
    }

    animate();
})