let platform, pad1, pad2, rudolph, elf;
let jumpSnd, snowSnd;

function preload() {
    createCanvas(800, 600);

    jumpSnd = loadSound('/assets/sounds/jump.mp3');
    snowSnd = loadSound('/assets/sounds/snow.mp3');

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
    rudolph.y = height - 20;
    rudolph.changeAni('idle');

    elf = new Sprite();
    elf.width = 32;
    elf.height = 32;
    elf.scale.x = 1;
    elf.scale.y = 1;
    elf.rotationLock = true;


}

function setup() {

    displayMode('normal', 'pixelated');

    world.gravity.y = 10;

    initializeSprites();

    addWall(300, 430, 5, 300);
    addWall(500, 430, 5, 300);

    addWall(300, 0, 5, 300);
    addWall(500, 0, 5, 300);

    addFloor(700, 150, 200, 5);
    addFloor(500, 250, 100, 5);

    addFloor(500, 250, 100, 5);
    
    addFloor(100, height-20, 100, 5);

    pad1 = addFloor(200, height-20, 50, 5);
    pad1.fill="red";

    pad2 = addFloor(200, height-20, 50, 5);
    pad2.fill="blue";

    rudolph.scale.x = 2;
    rudolph.scale.y = 2;

}

function draw() {
    background(200);

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
        elf.scale.x = -2;
    }
    if (kb.pressing('ArrowRight')) {
        elf.vel.x = 3;
        elf.scale.x = 2;
    }
    
    if (kb.pressing('ArrowUp') && touchingFloor(elf)) {
        elf.vel.y = -4;
    }

    if (kb.presses('w')) {
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
}