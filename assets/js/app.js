
let sprite1, sprite2;
let floorSprites, wallSprites;
let bricks, badBricks;

function preload() {
  sprite1 = new Sprite();
  sprite1.spriteSheet = '/assets/images/sprites/spritesheet_boy.png';
  sprite1.anis.offset.x = 2;
  sprite1.anis.frameDelay = 8;
  sprite1.addAnis({
	run: { row: 0, frames: 4 },
  });
  
  sprite2 = new Sprite();
  sprite2.spriteSheet = '/assets/images/sprites/spritesheet_girl.png';
  sprite2.anis.offset.x = 2;
  sprite2.anis.frameDelay = 8;
  sprite2.addAnis({
	run: { row: 0, frames: 4 },
  });
  // I don't know how to scale the image I remember in class you mentioned we have to scale it from the sprite app we use so I'll try in sketch 6.
}

function touchingFloor(sprite) {
  if (sprite == sprite1 && sprite.colliding(sprite2)) return true;
  else if (sprite.colliding(sprite1)) return true;
  
  for (let i = 0; i < bricks.length; ++i) {
    if (sprite.colliding(bricks[i]) && sprite.y < bricks[i].y) return true;
  }
  
  return false;
}

function setup() {
  createCanvas(800, 600);
  
  world.gravity.y = 10;
  
  floorSprites = new Group();
  wallSprites = new Group();
  
  bricks = new Group();
  bricks.w = 20;
  bricks.h = 20;
  bricks.tile = '=';
  bricks.fill="rgb(120,52,52)";
  bricks.stroke="black";
  bricks.img = "/assets/images/sprites/brick.png";
  
  bricks.physics = KINEMATIC;
  
  badBricks = new Group();
  badBricks.w = 20;
  badBricks.h = 20;
  badBricks.tile = '-';
  badBricks.fill="rgb(255,0,0)";
  badBricks.stroke="black";

  tilesGroup = new Tiles(
		[
			'==================================',
            '=................................=',
            '=................................=',
            '=................................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..=========.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=========..=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..=========.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=========..=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=..........=.....................=',
            '=........--=.....................=',
			'==================================',
		],
		15, 15,
		bricks.w, bricks.h
  );
  
  sprite1.x = 50;
  sprite1.y = 450;
  sprite1.w = 32;
  sprite1.h = 32;
  sprite1.health = 100;
  
  sprite2.x = 100;
  sprite2.y = 450;
  sprite2.w = 32;
  sprite2.h = 32;
  sprite2.health = 100;
}

function handleCollision() {
  for (let i = 0; i < badBricks.length; ++i) {
    if (badBricks[i].collides(sprite2)) {
      sprite2.health = 0;
      console.log(sprite2.health);
    }
  }
}

function checkHealth() {
  if (sprite1.health < 1 || sprite2.health < 1) {
    resetLevel();
  }
}

function resetLevel() {
  sprite1.x = 50;
  sprite1.y = 480;
  sprite1.health = 100;
  
  
  sprite2.x = 100;
  sprite2.y = 480;
  sprite2.health = 100;
}

function keyPressed() {
  if (key == "w") {
    if (touchingFloor(sprite1)) {
    sprite1.vel.y -= 5;
    }
  }
  
  if (key == "ArrowUp") {
    if (touchingFloor(sprite2)) {
    sprite2.vel.y -= 5;
    }
  }
}

function draw() {
  background("white");
}

function avg(a, b) {
  return (a+b) / 2;
}

function drawFrame() {
    
  if (kb.pressing("a")) sprite1.x -= 5;
  if (kb.pressing("d")) sprite1.x += 5;
  
  if (kb.pressing("ArrowLeft")) sprite2.x -= 5;
  if (kb.pressing("ArrowRight")) sprite2.x += 5;
  
  camera.x = avg(sprite1.x, sprite2.x);
  camera.y = avg(sprite1.y, sprite2.y);
  
  camera.zoom = 2;
  
    sprite1.rotation = 0;
    sprite2.rotation = 0;


  handleCollision();
  checkHealth();
}
