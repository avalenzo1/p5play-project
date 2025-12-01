let sprite1, sprite2;
let floor0, floor1, floor2, floor3, floor4, floor5;
let wall1, wall2;
let platform;
let water;
let rock;

let maxJumps = 1;
let jumps = 0;
let jumps2 = 0;
let shrink = true;

let cannonLeft, cannonRight;
let bullets = [];
let fireCooldown = 0;

let orb;
let orbCollected = false;
let door = null;   // door starts as NON-EXISTENT
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  world.gravity.y = 10;

  // Players
  sprite1 = new Sprite(50, 500, 20, 40);
  sprite2 = new Sprite(750, 500, 20, 40);
  
  sprite1.rotationLock = true;
  sprite2.rotationLock = true;

  //sprite1.friction = 0.2;
  //sprite2.friction = 0.2;
  sprite1.bounciness = 0;
  sprite2.bounciness = 0;
  sprite1.drag = 0.3;
  sprite2.drag = 0.3;

  // Floors
  floor0 = new Sprite(400, 600, 800, 5, STATIC); // Bottom
  floor3 = new Sprite(400, 0, 800, 5, STATIC); // Top
  floor0.color = 'yellow';
  floor3.color = 'yellow';
  
  floor1 = new Sprite(400, 475, 400, 5, STATIC); // Shrinking
  floor1.color = '#9C27B0';
  
  floor2 = new Sprite(400, 150, 200, 5, STATIC); // High
  floor4 = new Sprite(600, 375, 400, 5, STATIC); // Low
  floor5 = new Sprite(700, 275, 300, 5, STATIC); // Middle
  floor2.color = '#4CAF50';
  floor4.color = '#4CAF50';
  floor5.color = '#4CAF50';

  // Walls
  wall1 = new Sprite(0, 300, 5, 600, STATIC);
  wall2 = new Sprite(800, 300, 5, 600, STATIC);
  wall1.color = 'yellow';
  wall2.color = 'yellow';

  // Moving platform
  platform = new Sprite(30, 275, 60, 5, KIN);
  platform.color = '#9C27B0';
  
  // Collectible orb (starts on the moving platform)
  orb = new Sprite(platform.x, platform.y - 15, 15, 15);
  orb.diameter = 15;  // forces circle shape
  orb.color = '#FF9800';
  orb.rotationLock = true;
  orb.layer = 1;  // render above the platform

  // Water pool
  water = new Sprite(400, 580, 300, 50, STATIC);
  water.color = 'lightblue';
  water.layer = -1;

  // Pushable rock
  rock = new Sprite(400, 560, 40, 40);
  rock.color = 'gray';
  rock.rotationLock = true;
  rock.friction = 5;
  rock.bounciness = 0;
  rock.mass = 4;     // heavier object (default is 1)
  rock.drag = 0.2;   // more resistance when pushing
  
  // Cannons
  cannonLeft = new Sprite(15, 100, 30, 30, STATIC);
  cannonLeft.color = 'black';

  cannonRight = new Sprite(785, 200, 30, 30, STATIC);
  cannonRight.color = 'black';
}

function draw() {
  background(220);
  
  // GAME OVER SCREEN
  if (gameOver) {
    background(0);
    fill('white');
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    text("Press R to Restart", width / 2, height / 2 + 60);
    return; // stop the game loop
  }

  // Moving platform
  platform.vel.y = cos(frameCount * 2.2) * 4;
  
  // Orb follows the moving platform
  if (!orbCollected) {
    orb.x = platform.x;
    orb.y = platform.y - 15;
  }

  // Shrinking floor
  if (shrink) {
    floor1.w -= 1;
    if (floor1.w <= 1) {
      floor1.w = 1;
      shrink = false;
    }
  } else {
    floor1.w += 1;
    if (floor1.w >= 400) {
      floor1.w = 400;
      shrink = true;
    }
  }

  // Reset jumps ONLY when standing on something solid
  if (
    onTopOf(sprite1, floor0) || onTopOf(sprite1, floor1) ||
    onTopOf(sprite1, floor2) || onTopOf(sprite1, floor3) ||
    onTopOf(sprite1, floor4) || onTopOf(sprite1, floor5) ||
    onTopOf(sprite1, sprite2) || onTopOf(sprite1, rock)
  ) {
    jumps = 0;
  }

  if (
    onTopOf(sprite2, floor0) || onTopOf(sprite2, floor1) ||
    onTopOf(sprite2, floor2) || onTopOf(sprite2, floor3) ||
    onTopOf(sprite2, floor4) || onTopOf(sprite2, floor5) ||
    onTopOf(sprite2, sprite1) || onTopOf(sprite2, rock)
  ) {
    jumps2 = 0;
  }

  // Jump logic
  if (jumps < maxJumps && sprite1.vel.y >= 0 && kb.presses('w')) {
    sprite1.vel.y = -6.5;
    jumps++;
  }
  if (jumps2 < maxJumps && sprite2.vel.y >= 0 && kb.presses('arrow_up')) {
    sprite2.vel.y = -6.5;
    jumps2++;
  }

  // Horizontal movement
  sprite1.vel.x = 0;
  if (kb.pressing('a')) sprite1.vel.x = -5;
  if (kb.pressing('d')) sprite1.vel.x = 5;

  sprite2.vel.x = 0;
  if (kb.pressing('arrow_left')) sprite2.vel.x = -5;
  if (kb.pressing('arrow_right')) sprite2.vel.x = 5;

  // Remove friction when touching walls or platform sides (fall normally)
  handleWallFall(sprite1);
  handleWallFall(sprite2);

  // Water interaction (blue sprite lives, red sprite dies)
  if (sprite1.overlapping(water)) {
    //sprite1.vel.y += world.gravity.y * 0.05;
    //sprite1.vel.x *= 0.5;
    sprite1.color = 'blue';
  } else sprite1.color = 'blue';

  if (sprite2.overlapping(water)) {
    sprite2.vel.y *= 0;
    sprite2.vel.x *= 0;
    sprite2.color = 'black';
  } else sprite2.color = 'red';

  // Rock sinking behavior
  if (rock.overlapping(water)) {
    rock.vel.x *= 0.5;
  }
  
  // CANNONS FIRE CONTINUOUSLY
  fireCooldown--;

  if (fireCooldown <= 0) {
    fireCooldown = 150; // Shoots interval

    // LEFT cannon
    let b1 = new Sprite(cannonLeft.x + 20, cannonLeft.y, 10, 4, KIN);
    b1.vel.x = 2;     // perfectly horizontal
    b1.vel.y = 0;      // ensure no vertical motion
    b1.color = 'red';
    b1.rotationLock = true;
    bullets.push(b1);

    // RIGHT cannon
    let b2 = new Sprite(cannonRight.x - 20, cannonRight.y, 10, 4, KIN);
    b2.vel.x = -2;    // perfectly horizontal
    b2.vel.y = 0;
    b2.color = 'red';
    b2.rotationLock = true;
    bullets.push(b2);
  }

  // Bullet behavior
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];

    // Remove bullets off screen
    if (b.x < -50 || b.x > 850) {
      b.remove();
      bullets.splice(i, 1);
      continue;
    }

    // Bullet kills players
    if (b.colliding(sprite1)) {
      sprite1.pos = { x: 50, y: 500 };
    }
    if (b.colliding(sprite2)) {
      sprite2.pos = { x: 750, y: 500 };
    }
  }

  // Player1 collects the orb
  if (!orbCollected && sprite2.overlapping(orb)) {
    orbCollected = true;
    orb.remove();  // hides the orb
    // TODO: Add sound
    
    // Spawn door
    door = new Sprite(100, 500, 30, 60, STATIC);
    door.color = 'brown';
    door.layer = 1;
  }
  
  // Door activation: BOTH players must touch it
  if (!gameOver && door && 
      sprite1.overlapping(door) && sprite2.overlapping(door)) {
    gameOver = true;
  }

  // Restart
  if (kb.presses('r')) {
    gameOver = false;

    sprite1.pos = { x: 50, y: 500 };
    sprite2.pos = { x: 750, y: 500 };

    floor1.w = 410;

    // Remove door if it existed
    if (door) {
      door.remove();
      door = null;
    }

    // Respawn orb
    orbCollected = false;
    orb = new Sprite(platform.x, platform.y - 15, 15, { shape: "circle" });
    orb.color = 'cyan';
    orb.rotationLock = true;
  }
}

function onTopOf(a, b) {
  return (
    a.colliding(b) &&            // must be touching
    a.vel.y >= 0 &&              // must be falling or resting
    (a.y + a.h/2) <= (b.y - b.h/4) // must be above the object
  );
}

// Detect if sprite is touching sides and remove friction to allow falling
function handleWallFall(s) {
  if (
    s.colliding(wall1) ||
    s.colliding(wall2) ||
    (s.colliding(floor1) ||
    s.colliding(floor2))
  ) {
    s.friction = 0; // prevents sticking
    console.log('Function is working');
  } else {
    s.friction = 0.2; // normal walking friction
  }
}
