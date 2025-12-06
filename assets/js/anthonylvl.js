let levelPassed = false, platform1Return = false, platform2Return =false, platform1, platform2, trap, pad1, pad2, rudolph, elf, latch, gift;
let timeLimit = 120; // seconds
let health = 100;
let timeLeft = timeLimit;
let time = 40;

let levelPassedScreenInitialized = false;

let maxJumps = 1;
let jumps = 1;
let jumps2 = 1;
let music;

function preload() {
    createCanvas(800, 600);

    loadSounds();
    loadIcons();
    music = loadSound('/assets/sounds/christmas_jazz.mp3');

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
    elf.spriteSheet = '/assets/images/sprites/elf.png';
    elf.addAnis({
        idle: { row: 0, frames: 1 },
        jump: { row: 1, frames: 1 },
        run: { row: 0, frames: 4 },
    });
    elf.changeAni('idle');
    elf.anis.frameDelay = 16;
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
    music.loop();

    world.gravity.y = 10;

    initializeSprites();

    addBorders();


    addWall(300, 430, 5, 300);
    addWall(500, 430, 5, 300);

    addWall(300, 0, 5, 300);
    addWall(500, 0, 5, 300);

    latch = addFloor(400, 155, 200, 5);
    latch.fill = "gold";
    latch.stroke = "gold"

    gift = addGift(400, 120);
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
    pad3.stroke = "red";

    addGift(100, 100);
    addGift(100, 200);
    addGift(100, 300);
    addGift(100, 400);
}

function Movement(){
    if (kb.pressing('a')) {
        rudolph.vel.x = -3;
        rudolph.scale.x = -2;
    }
    if (kb.pressing('d')){
        rudolph.vel.x = 3;
        rudolph.scale.x = 2;
    }

    if (kb.pressing('ArrowLeft')) {
        elf.vel.x = -3;
        elf.scale.x = -1;
    }
    if (kb.pressing('ArrowRight')) {
        elf.vel.x = 3;
        elf.scale.x = 1;
    }
}

function resetJumps() {
    if (touchingFloor(rudolph)) {
        jumps = maxJumps;
    }

    if (touchingFloor(elf)) {
        jumps2 = maxJumps;
    }
}

function playerJumps() {
    // if (kb.presses('w') || kb.presses('ArrowUp')) {
    //     jumpSnd.play();
    // }

    if (kb.presses('w') && jumps > 0) {
        rudolph.vel.y = -4;
        jumpSnd.play();
        jumps--;
    }

    if (kb.presses('ArrowUp') && jumps2 > 0) {
        elf.vel.y = -4;
        jumpSnd.play();
        jumps2--;
    }
}

function draw() {
    image(bgAntImg,0,0);

    if (levelPassed) {
        return;
    }

    if (rudolph.colliding(pad1)) {
        if (platform1Return) {
            platform1.vel.y = 2;

            if (platform1.y > height - 20) {
                platform1Return = false;
            }
        } else {
            platform1.vel.y = -2;

            if (platform1.y < 350) {
                platform1Return = true;
            }
        }

        // if (platform1.y > 350) {
            
        // } else if (platform1.y < 350) {
        //     platform1.vel.y = 2;
        // }
    } else {
        platform1.vel.y = 0;
    }

    if (elf.colliding(pad2)) {
        if (platform2Return) {
            platform2.vel.y = 2;

            if (platform2.y > height - 20) {
                platform2Return = false;
            }
        } else {
            platform2.vel.y = -2;

            if (platform2.y < 200) {
                platform2Return = true;
            }
        }
    } else {
        platform2.vel.y = 0;
    }

    if (rudolph.colliding(pad3)) {
        latch.width = 20
        latch.physics = DYNAMIC;
    }

    if (elf.colliding(trap)) {
        trap.physics = KINEMATIC;
    }

    Movement();

    resetJumps();

    playerJumps();

    // if (kb.pressing('w') && touchingFloor(rudolph)) {
    //     rudolph.vel.y = -4;
    // }

    // if (kb.pressing('ArrowUp') && touchingFloor(elf)) {
    //     elf.vel.y = -4;
    // }

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

    //elf jump
    if (kb.pressing('ArrowUp')) {
        elf.changeAni('jump');
    } else if (kb.pressing('ArrowLeft') || kb.pressing('ArrowRight')) {
        elf.changeAni('run');

        if (!snowSnd.isPlaying()) {
            snowSnd.jump(0.1);

            snowSnd.play();
        }
    } else {
        elf.changeAni('idle');
    }


    if (score >= 500) {
        levelPassed = true;
    }

    checkForGift();

    if(kb.presses('r')){
      //restart game;
      rudolph.pos = { x: 100, y: height - 50 };
      elf.pos = { x: 600, y: height - 50 };
      time = 40;
      timeLeft = timeLimit;
      score = 0;
    }
}


function drawFrame() {
    allSprites.draw();
    drawUI();
}

function mouseClicked() {
    if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32 && levelPassed) {
        window.location.href="/jakublvl.html";
    }

    if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32 && (levelPassed || timeLeft <= 0)) {
        window.location.reload();
    }
}

function drawUI() {
    noStroke();
    fill('white');
    textSize(18);
    text(`Score: ${score}`, 20, 60);

    // GUI: Timer
    text(`Time Left: ${timeLeft}s`, 20, 30);

    if(timeLeft > 0){
      if(time < 0){
        
        timeLeft--;  
        time = 40;
      }
      time--;
    }

    if (levelPassed) {
        if (!levelPassedScreenInitialized) {
            score += timeLeft * 100;
            levelPassSnd.play();

            levelPassedScreenInitialized = true;
        }

        background("#0004");

        textSize(32);
        textAlign(CENTER);
        text(`LEVEL PASSED!`, width / 2, height / 2 - 64);

        textSize(16);
        textAlign(CENTER);
        text(`Final Score: ${score}`, width / 2, height / 2 + 64);

        image(voidStarImg, width / 2 - 128, height / 2 - 32, 64, 64);
        image(voidStarImg, width / 2 - 32, height / 2 - 32, 64, 64);
        image(voidStarImg, width / 2 + 64, height / 2 - 32, 64, 64);

        if (score >= 600) {
            image(starImg, width / 2 - 128, height / 2 - 32, 64, 64);
        }

        if (score >= 2500) {
            image(starImg, width / 2 - 32, height / 2 - 32, 64, 64);
        }

        if (score >= 4600) {
            image(starImg, width / 2 + 64, height / 2 - 32, 64, 64);
        }

        if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32) {
            image(nextLevelHoverImg, width / 2 - 84, height / 2 + 100, 64, 64);
        } else {
            image(nextLevelImg, width / 2 - 84, height / 2 + 100, 64, 64);
        }

        if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32) {
            image(replayLevelHoverImg, width / 2 + 16, height / 2 + 100, 64, 64);
        } else {
            image(replayLevelImg, width / 2 + 16, height / 2 + 100, 64, 64);
        }
    }

    if (timeLeft <= 0 && !levelPassed) {
        background("#F00");

        textSize(32);
        textAlign(CENTER);
        text(`LEVEL FAILED!`, width / 2, height / 2 - 64);

        textSize(16);
        textAlign(CENTER);
        text(`Final Score: ${score}`, width / 2, height / 2 + 64);

        image(voidStarImg, width / 2 - 128, height / 2 - 32, 64, 64);
        image(voidStarImg, width / 2 - 32, height / 2 - 32, 64, 64);
        image(voidStarImg, width / 2 + 64, height / 2 - 32, 64, 64);

        if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32) {
            image(replayLevelHoverImg, width / 2 + 16, height / 2 + 100, 64, 64);
        } else {
            image(replayLevelImg, width / 2 + 16, height / 2 + 100, 64, 64);
        }
    }
}