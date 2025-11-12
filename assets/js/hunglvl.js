let sprite1, sprite2;
let floor0, floor1, floor2, floor3;
let wall, wall2;
let platform;
let water;

let maxJumps = 2;
let jumps = 0;
let jumps2 = 0;

function setup() {
  createCanvas(800, 600);
  world.gravity.y = 10;

  // Players
  sprite1 = new Sprite(700, 350, 20, 40);
  sprite2 = new Sprite(725, 350, 20, 40);

  // Floors
  floor0 = new Sprite(200, 550, 1500, 5, STATIC);
  floor1 = new Sprite(200, 395, 400, 5, STATIC);
  floor2 = new Sprite(350, 300, 100, 5, STATIC);
  floor3 = new Sprite(375, 130, 100, 5, STATIC);

  // Walls
  wall = new Sprite(0, 300, 5, 600, STATIC);
  wall2 = new Sprite(400, 300, 5, 400, STATIC);

  // Moving platform
  platform = new Sprite(30, 200, 60, 5, KIN);

  // Water pool
  water = new Sprite(200, 550, 300, 50, STATIC);
  water.color = 'lightblue';
  water.layer = -1; // Draw behind others
}

function draw() {
  background(220);

  // --- Moving platform ---
  platform.vel.y = cos(frameCount * 2.2) * 6;

  // --- Shrinking floor ---
  if (floor1.w > 1) {
    floor1.w -= 1;
  }

  // --- Reset jumps when standing on floor or in water ---
  if (
    sprite1.colliding(floor0) || sprite1.colliding(floor1) ||
    sprite1.colliding(floor2) || sprite1.colliding(floor3) ||
    (sprite1.overlapping(water) && sprite1.vel.y >= 0)
  ) {
    jumps = 0;
  }

  if (
    sprite2.colliding(floor0) || sprite2.colliding(floor1) ||
    sprite2.colliding(floor2) || sprite2.colliding(floor3) ||
    (sprite2.overlapping(water) && sprite2.vel.y >= 0)
  ) {
    jumps2 = 0;
  }

  // --- Jump logic ---
  if (jumps < maxJumps && kb.presses('w')) {
    sprite1.vel.y = -5;
    jumps++;
  }
  if (jumps2 < maxJumps && kb.presses('arrow_up')) {
    sprite2.vel.y = -5;
    jumps2++;
  }

  // --- Horizontal movement ---
  sprite1.vel.x = 0;
  if (kb.pressing('a')) sprite1.vel.x = -5;
  if (kb.pressing('d')) sprite1.vel.x = 5;

  sprite2.vel.x = 0;
  if (kb.pressing('arrow_left')) sprite2.vel.x = -5;
  if (kb.pressing('arrow_right')) sprite2.vel.x = 5;

  // --- Water interaction ---
  if (sprite1.overlapping(water)) {
    sprite1.vel.y += world.gravity.y * 0.05; // gentle sinking
    sprite1.vel.x *= 0.5;                     // horizontal drag
    sprite1.color = 'blue';
  } else sprite1.color = 'blue';

  if (sprite2.overlapping(water)) {
    sprite2.vel.y *= 0;
    sprite2.vel.x *= 0;
    sprite2.color = 'black';
  } else sprite2.color = 'red';

  // Keep players upright
  sprite1.rotation = 0;
  sprite2.rotation = 0;

  // --- Restart game ---
  if (kb.presses('r')) {
    sprite1.pos = { x: 700, y: 350 };
    sprite2.pos = { x: 725, y: 350 };
    floor1.w = 410;
  }
}
