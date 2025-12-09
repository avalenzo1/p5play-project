function setup() {
    createCanvas(800, 600);

    world.gravity.y = 10;
    world.gravity.x = -10;

    displayMode('normal', 'pixelated');

    santaSleigh = new Sprite(width / 2, height / 2, 144, 64);
    santaSleigh.image = "/assets/images/sprites/santaSleigh.png"
    santaSleigh.scale = 2;
    santaSleigh.physics = KIN;
    initializeSprites();
}

let giftAmount = 2 + 5 + 2 + 1;
let santaSleigh;
let bellSnd;
let fortniteSnd;
let fahSnd;
let ringSnd;
let oohSnd;
let explosionSnd;
let explosionGif;
let playExplosion = false, playedExplosion = false; // present and future tense

const dialogue = [
    "Santa delivered the presents to all of the children",
    "And so Christmas is saved!",
    "That's all folks!",
];

let currentLine = 0;
let currentChar = 0;

function mouseClicked() {

}

function preload() {
    explosionSnd = loadSound('/assets/sounds/explosion.mp3');
    explosionGif = loadImage('/assets/images/sprites/explosion.gif');
    fortniteSnd = loadSound('/assets/sounds/death.mp3');
    bellSnd = loadSound('/assets/sounds/bell.mp3');
    fahSnd = loadSound('/assets/sounds/fahhhhhhhhhhhhhh.mp3');
    oohSnd = loadSound('/assets/sounds/ooh.mp3');
    ringSnd = loadSound('/assets/sounds/ring.mp3');

    loadSounds();
}

let cloudX = 0;
let cloudY = 0;


function draw() {
    background("#2e1f47ff");

    ellipse(200 + cloudX, 200 + cloudY, 300, 100);

    ellipse(500 + cloudX, 300 + cloudY, 300, 100);

    if (currentLine < 3)
        santaSleigh.vel.y = cos(frameCount * 2.2) * 2;

    if (currentLine == 2) {
        santaSleigh.x += random(-2, 2);
        santaSleigh.y += random(-2, 2);
    }

    if (frameCount % 120 == 0) {
        let newGift = addGift(santaSleigh.x-100, santaSleigh.y+10);
        newGift.physics = DYNAMIC;
    }

    cloudX -= 2;

    if (cloudX < -700) {
        cloudX = width;
    }


    if (playedExplosion) {
        image(explosionGif, width - 600, height / 2, 400, 400);
        explosionGif.play();
    }
}

function drawDialogue() {
    fill("#2a2a2aff");
    rect(0, height - 80, width, 80);
    fill("#fff");
    textAlign(CENTER);
    let modified = dialogue[currentLine].slice(0, currentChar);
    text(modified, width / 2, height - 40);

    if (frameCount % 3 == 0) {
        currentChar++;
    }

    if (kb.pressed('Enter')) {
        if (currentLine < dialogue.length - 1) {
            if (currentLine == 1) {
                if (!hohohoSnd.isPlaying()) {
                hohohoSnd.play();
                }
            }

            currentLine++;
            
            currentChar = 0;
        } else {
            window.location.href = "/";
        }
    }
}

function drawFrame() {
    allSprites.draw();

    drawDialogue();
}