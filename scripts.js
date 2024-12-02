const canvas = document.getElementById('lightning');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function drawLightning(startX, startY, endX, endY, branchCount) {
    let curX = startX;
    let curY = startY;

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    for (let i = 0; i < branchCount; i++) {
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = Math.random() * 50;

        curX += offsetX;
        curY += offsetY;

        ctx.lineTo(curX, curY);

        if (curX > canvas.width || curY > canvas.height) break;
    }

    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(106, 106, 226, ${Math.random() * 0.6 + 0.4})`;
    ctx.lineWidth = window.innerWidth < 600 ? 1.5 : 2 + Math.random() * 2; // Adjust for smaller screens
    ctx.stroke();
    ctx.closePath();
}

function animateLightning() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lightningBolts = window.innerWidth < 600 ? 3 : 5; // Fewer bolts on smaller screens
    for (let i = 0; i < lightningBolts; i++) {
        drawLightning(
            Math.random() * canvas.width, // Start X
            0,                           // Start Y (top of the canvas)
            Math.random() * canvas.width, // End X
            canvas.height,               // End Y (bottom of the canvas)
            Math.random() * 10 + 10      // Branch count
        );
    }

    requestAnimationFrame(animateLightning);
}

// Start the animation
animateLightning();
