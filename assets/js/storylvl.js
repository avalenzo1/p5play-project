function setup() {
    createCanvas(800, 600);

    displayMode('normal', 'pixelated');

    santaSleigh = new Sprite(width / 2, height / 2, 144, 64);
    santaSleigh.image = "/assets/images/sprites/santaSleigh.png"
    santaSleigh.scale = 2;
    initializeSprites();
}

let santaSleigh;
let bellSnd;
let fortniteSnd;
let fahSnd;
let explosionSnd;
let explosionGif;
let playExplosion = false, playedExplosion = false; // present and future tense

const dialogue = [
    "Press the [Enter] key to continue.",
    "Santa was slaying the day before Christmas",
    "but Santa is dumb -- he forgot to put gasoline on the reindeers]...",
    "idk",
    "Santa's elf and and Rudolph must now save Christmas!"
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
}

let cloudX = 0;
let cloudY = 0;

function draw() {
    background(235);

    ellipse(200 + cloudX, 200 + cloudY, 300, 100);

    ellipse(500 + cloudX, 300 + cloudY, 300, 100);

    if (currentLine < 3)
    santaSleigh.vel.y = cos(frameCount * 2.2) * 2;

    if (currentLine == 2) {
        santaSleigh.x += random(-2, 2);
        santaSleigh.y += random(-2, 2);
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
            currentLine++;

            if (currentLine == 2) {
                if (!bellSnd.isPlaying()) {
                    bellSnd.play();
                }

                if (!fahSnd.isPlaying()) {
                    fahSnd.play();

                }

                santaSleigh.image = "/assets/images/sprites/santaSadSleigh.png"
                santaSleigh.vel.y = 0;
            }

            if (currentLine == 3) {
                santaSleigh.physics = DYNAMIC;
                santaSleigh.rotationSpeed = 1;
                world.gravity.y = 10;
                world.gravity.x = 2;

                if (!playExplosion) {
                    setTimeout(() => {
                        explosionSnd.play();
                        playedExplosion = true;

                        setTimeout(() => {
fortniteSnd.play();
                        }, 200);
                    }, 1000);

                    playExplosion = true;
                }
            }

            currentChar = 0;
        } else {
            window.location.href = "/adrianlvl.html";
        }
    }
}

function drawFrame() {
    allSprites.draw();

    drawDialogue();
}