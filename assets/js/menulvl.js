function setup() {
    createCanvas(800, 600);
    displayMode('normal', 'pixelated');

    loadIcons();
    loadSounds();
    initializeSprites();
}

let activeMouse = false;

function draw() {
    background(255);

    fill("#2a2a2aff");
    textAlign(CENTER);
    textSize(32)
    text(`Save christmas or somehtingis `, width / 2, height / 2 - 64);

    if (dist(mouseX, mouseY, width / 2, height / 2 + 64 + 32) <= 32) {
        image(activeMouse ? nextLevelClickedImg : nextLevelHoverImg, width / 2 - 32, height / 2 + 64, 64, 64);
    } else {
        image(nextLevelImg, width / 2 - 32, height / 2 + 64, 64, 64);
    }

    image(nextLevelImg, width / 2 - 32, height / 2 + 64, 64, 64);
}

function mousePressed() {
    activeMouse = true;
    
    if (dist(mouseX, mouseY, width / 2, height / 2 + 64 + 32) <= 32) {
        window.location.href="/storylvl.html";
    }
}

function mouseReleased() {
    activeMouse = false;
}