let platform, pad1, pad2, rudolph, elf;

function preload() {
    createCanvas(800, 600);

    // Loading 
    rudolph = new Sprite();
    rudolph.spriteSheet = '/assets/images/sprites/rudolphSpriteSheet.png';
    rudolph.anis.frameDelay = 8;
    rudolph.addAnis({
        idle: { row: 0, frames: 1 },
        jump: { row: 1, frames: 1 },
        run: { row: 0, frames: 4 },
    });
    
    rudolph.width = 32;
    rudolph.height = 32;
    rudolph.rotationLock = true;
    rudolph.bounciness = 0;
    rudolph.friction = 0.99;
    rudolph.x = 100;
    rudolph.y = height - 20;
    rudolph.changeAni('idle');

    elf = new Sprite();
    elf.width = 32;
    elf.height = 32;
    elf.scale.x = 2;
    elf.scale.y = 2;


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
    
    if (kb.pressing('w') && touchingFloor(rudolph) && !touchingWall(rudolph)) {
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
    
    if (kb.pressing('ArrowUp') && touchingFloor(elf) && !touchingWall(elf)) {
        rudolph.vel.y = -4;
    }

    if (kb.pressing('w')) {
        rudolph.changeAni('jump');
    } else if (kb.pressing('a') || kb.pressing('d')) {
        rudolph.changeAni('run');
    } else {
        rudolph.changeAni('idle');
    }

    // camera.x = rudolph.x;
    // camera.y = rudolph.y;
    camera.zoom = 1;
}