let levelPassed = false, platform1, platform2, trap, pad1, pad2, rudolph, elf, latch, gift;
let jumpSnd, snowSnd, giftSnd, levelPassSnd;

function preload() {
    createCanvas(800, 600);

    jumpSnd = loadSound('/assets/sounds/jump.mp3');
    snowSnd = loadSound('/assets/sounds/snow.mp3');
    giftSnd = loadSound('/assets/sounds/gift.mp3');
    levelPassSnd = loadSound('/assets/sounds/levelPass.mp3');

    // Loading 
    rudolph = new Sprite();
    rudolph.spriteSheet = '/assets/images/sprites/rudolphSpriteSheet.png';
    rudolph.anis.frameDelay = 16;
    rudolph.addAnis({
        idle: { row: 0, frames: 1 },
        jump: { row: 1, frames: 1 },
        run: { row: 0, frames: 4 },
    });

    rudolph.width = 32;
    rudolph.height = 32;
    rudolph.rotationLock = true;
    rudolph.bounciness = 0;
    rudolph.friction = 1;
    rudolph.x = 100;
    rudolph.y = height - 50;
    rudolph.changeAni('idle');

    elf = new Sprite();
    elf.width = 32;
    elf.height = 32;
    elf.scale.x = 1;
    elf.scale.y = 1;
    elf.rotationLock = true;
    elf.x = 600;
    elf.y = height - 20;
}

function setup() {

    displayMode('normal', 'pixelated');

    world.gravity.y = 10;

    initializeSprites();

    addWall(300, 430, 5, 300);
    addWall(500, 430, 5, 300);

    addWall(300, 0, 5, 300);
    addWall(500, 0, 5, 300);

    latch = addFloor(400, 155, 200, 5);
    latch.fill = "gold";
    latch.stroke = "gold"

    gift = addGift(400, 120);
    gift.scale = 2;
    gift.physics = DYNAMIC;

    addFloor(700, 150, 200, 5);
    addFloor(500, 250, 100, 5);

    addFloor(550, 200, 50, 5);


    platform2 = addFloor(100, height - 24, 100, 5);
    platform2.physics = KINEMATIC;

    pad1 = addFloor(200, height - 24, 50, 5);
    pad1.fill = "red";
    pad1.stroke = "red";

    platform1 = addFloor(700, height - 24, 100, 5);
    platform1.physics = KINEMATIC;

    pad2 = addFloor(700, 145, 50, 5);
    pad2.fill = "#00ff00";
    pad2.stroke = "#00ff00"

    rudolph.scale.x = 2;
    rudolph.scale.y = 2;

    trap = addFloor(575, 300, 150, 5);

    pad3 = addFloor(200, 200, 50, 5);
    pad3.fill = "red";

    addGift(100, 100);
    addGift(100, 200);
    addGift(100, 300);
    addGift(100, 400);
}

function draw() {
    background(200);

    if (rudolph.colliding(pad1)) {
        if (platform1.y > 350) {
            platform1.vel.y = -2;
        } else {
            platform1.vel.y = 0;
        }
    }

    if (elf.colliding(pad2)) {
        pad1.y = height - 20;

        if (platform2.y > 200) {
            platform2.vel.y = -2;
        } else {
            platform2.vel.y = 0;
        }
    }

    if (rudolph.colliding(pad3)) {
        latch.physics = DYNAMIC;
    }

    if (elf.colliding(trap)) {
        trap.physics = KINEMATIC;
    }

    if (kb.pressing('a')) {
        rudolph.vel.x = -3;
        rudolph.scale.x = -2;
    }
    if (kb.pressing('d')) {
        rudolph.vel.x = 3;
        rudolph.scale.x = 2;
    }

    if (kb.pressing('w') && touchingFloor(rudolph)) {
        rudolph.vel.y = -4;
    }

    if (kb.pressing('ArrowLeft')) {
        elf.vel.x = -3;
        elf.scale.x = -1;
    }
    if (kb.pressing('ArrowRight')) {
        elf.vel.x = 3;
        elf.scale.x = 1;
    }

    if (kb.pressing('ArrowUp') && touchingFloor(elf)) {
        elf.vel.y = -4;
    }

    if (kb.presses('w') || kb.presses('ArrowUpr')) {
        jumpSnd.play();
    }

    if (kb.pressing('w')) {
        rudolph.changeAni('jump');
    } else if (kb.pressing('a') || kb.pressing('d')) {
        rudolph.changeAni('run');

        if (!snowSnd.isPlaying()) {
            snowSnd.jump(0.1);

            snowSnd.play();
        }
    } else {
        rudolph.changeAni('idle');
    }

    if (score == 5) {
        levelPassed = true;
    }

    checkForGift();
}

function drawFrame() {
    allSprites.draw();
    drawUI();

}

function drawUI() {
    text(`Score: ${score}`, 24, 24);

    if (levelPassed) {
        noLoop();
        textSize(32);
        textAlign(CENTER);
        text(`LEVEL PASSED!`, width / 2, height / 2);
        levelPassSnd.play();
    }
}