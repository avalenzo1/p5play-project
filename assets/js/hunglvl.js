let elf, rudolph;
let floor0, floor1, floor2, floor3, floor4, floor5;
let wall1, wall2;
let platform;
let water;
let rock;

let maxJumps = 2;
let jumps = 0;
let jumps2 = 0;
let shrink = true;

let cannonLeft, cannonRight;
let bullets = [];
let fireCooldown = 0;

let gift;
let orbCollected = false;
let door = null;   // door starts as NON-EXISTENT
//let gameOver = false;
let levelPassed = false;
let levelPassedScreenInitialized = false;
let timeLimit = 120; // seconds
let health = 100;
let timeLeft = timeLimit;
let time = 60;

function preload() {
  loadSounds();
  loadIcons();

  // Loading 
  rudolph = new Sprite();
  rudolph.spriteSheet = '/assets/images/sprites/rudolphSpriteSheet.png';
  rudolph.anis.frameDelay = 16;
  rudolph.addAnis({
    idle: { row: 0, frames: 1 },
    jump: { row: 1, frames: 1 },
    run: { row: 0, frames: 4 },
    frozen: { row: 2, frames: 1 },
  });

  rudolph.width = 32;
  rudolph.height = 32;
  rudolph.rotationLock = true;
  rudolph.bounciness = 0;
  rudolph.friction = 1;
  rudolph.x = 50;
  rudolph.y = 600;
  rudolph.changeAni('idle');

  elf = new Sprite();
  elf.spriteSheet = '/assets/images/sprites/elf.png';
  elf.addAnis({
      idle: { row: 0, frames: 1 },
      jump: { row: 1, frames: 1 },
      run: { row: 0, frames: 4 },
  });
  elf.width = 32;
  elf.height = 32;
  elf.scale.x = 1;
  elf.scale.y = 1;
  elf.rotationLock = true;
  elf.x = 750;
  elf.y = 600;
}

function setup() {
  createCanvas(800, 600);
  displayMode('normal', 'pixelated');

  world.gravity.y = 10;

  //elf.friction = 0.2;
  //rudolph.friction = 0.2;
  elf.bounciness = 0;
  rudolph.bounciness = 0;
  elf.drag = 0.3;
  rudolph.drag = 0.3;

  initializeSprites();

  // Floors
  floor0 = new Sprite(400, 600, 800, 5, STATIC); // Floor
  floor5 = new Sprite(400, 0, 800, 5, STATIC); // Ceiling
  floor0.color = 'yellow';
  floor5.color = 'yellow';

  floor1 = new Sprite(350, 425, 300, 5, STATIC); // Shrinking
  floor1.color = 'red';

  floor2 = new Sprite(400, 250, 200, 5, STATIC); // Top
  floor3 = new Sprite(700, 350, 300, 5, STATIC); // Middle
  floor4 = new Sprite(700, 500, 300, 5, STATIC); // Bottom
  floor2.color = 'green';
  floor3.color = 'green';
  floor4.color = 'green';

  // Walls
  wall1 = new Sprite(0, 300, 5, 600, STATIC);
  wall2 = new Sprite(800, 300, 5, 600, STATIC);
  wall1.color = 'yellow';
  wall2.color = 'yellow';

  // Moving platform
  platform = new Sprite(30, 250, 60, 5, KIN);
  platform.color = 'red';

  // Collectible orb (starts on the moving platform)
  gift = addGift(platform.x, platform.y - 15);
  gift.rotationLock = true;

  // Water pool
  water = new Sprite(250, 580, 250, 50, STATIC);
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
  cannonLeft = new Sprite(15, 125, 30, 30, STATIC);
  cannonLeft.color = 'black';

  cannonRight = new Sprite(785, 200, 30, 30, STATIC);
  cannonRight.color = 'black';

  rudolph.scale.x = 2;
  rudolph.scale.y = 2;
}

function draw() {
  background(220);

  if (levelPassed) {
      return;
  }

  // GAME OVER SCREEN
  /*if (gameOver) {
    background(0);
    fill('white');
    textSize(50);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    text("Press R to Restart", width / 2, height / 2 + 60);
    return; // stop the game loop
  }*/

  // Moving platform
  //platform.vel.y = cos(frameCount * 2.2) * 4;

  // Orb follows the moving platform
  if (!orbCollected) {
    gift.x = platform.x;
    gift.y = platform.y - 15;
  }

  // Shrinking floor
  if (shrink) {
    floor1.w -= 1;
    if (floor1.w <= 100) {
      floor1.w = 100;
      shrink = false;
    }
  } else {
    floor1.w += 1;
    if (floor1.w >= 300) {
      floor1.w = 300;
      shrink = true;
    }
  }


  if (kb.pressing('a')) {
      rudolph.vel.x = -3;
      rudolph.scale.x = -2;
  }
  else if (kb.pressing('d')) {
      rudolph.vel.x = 3;
      rudolph.scale.x = 2;
  } else{
    rudolph.vel.x = 0;
  }

  if (kb.pressing('ArrowLeft')) {
      elf.vel.x = -3;
      elf.scale.x = -1;
  }
  else if (kb.pressing('ArrowRight')) {
      elf.vel.x = 3;
      elf.scale.x = 1;
  } else{
      elf.vel.x = 0;
  }

  if (onTopOf(rudolph, floor0) || onTopOf(rudolph, floor1) ||
    onTopOf(rudolph, floor2) || onTopOf(rudolph, floor3) ||
    onTopOf(rudolph, floor4) || onTopOf(rudolph, floor5) ||
    onTopOf(rudolph, elf) || onTopOf(rudolph, rock) || touchingFloor(rudolph)
  ) {
      jumps2 = 0;
  }

  if (onTopOf(elf, floor0) || onTopOf(elf, floor1) ||
    onTopOf(elf, floor2) || onTopOf(elf, floor3) ||
    onTopOf(elf, floor4) || onTopOf(elf, floor5) ||
    onTopOf(elf, rudolph) || onTopOf(elf, rock) || touchingFloor(elf)
  ) {
    jumps = 0;
  }

  if (jumps < maxJumps && elf.vel.y >= 0 && kb.presses('ArrowUp')) {
    elf.vel.y = -4;
    jumps++;
  }
  if (jumps2 < maxJumps && rudolph.vel.y >= 0 && kb.presses('w')) {
    rudolph.vel.y = -4;
    jumps2++;
  }

  if (kb.presses('w') || kb.presses('ArrowUp')) {
      jumpSnd.play();
  }

  if (kb.pressing('w')) {
      rudolph.changeAni('jump');
  } else if (kb.pressing('a') || kb.pressing('d')) {
      rudolph.changeAni('run');

      if (!snowSnd.isPlaying() && !rudolph.overlapping(water)) {
          snowSnd.jump(0.1);

          snowSnd.play();
      }
  } else {
      rudolph.changeAni('idle');
  }

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

  // Remove friction when touching walls or platform sides (fall normally)
  //handleWallFall(elf);
  //handleWallFall(rudolph);

  // Water interaction (blue sprite lives, red sprite dies)
  if (elf.overlapping(water)) {
    //elf.vel.y += world.gravity.y * 0.05;
    //elf.vel.x *= 0.5;
    elf.color = 'blue';
  } else elf.color = 'blue';

  if (rudolph.overlapping(water)) {
    rudolph.vel.y *= 0;
    rudolph.vel.x *= 0;
    rudolph.changeAni('frozen');
    if (!freezeSnd.isPlaying()) {
    freezeSnd.jump(0.1);

    freezeSnd.play();
    }
  } 
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
    if (b.colliding(rudolph)) {
      b.remove();
      bullets.splice(i, 1);
      continue;
      //rudolph.pos = { x: 50, y: 500 };
    }
    if (b.colliding(elf)) {
      elf.pos = { x: 750, y: 500 };
    }
  }

  // Player1 collects the orb
  if (!orbCollected && (elf.overlapping(gift) || rudolph.overlapping(gift))) {
    orbCollected = true;
    gift.remove();  // hides the orb
    giftSnd.play();
    score += 100;

    // Spawn door
    door = new Sprite(700, 470, 30, 60, STATIC);
    door.image = '/assets/images/sprites/portal.png';
    //door.color = 'brown';
    door.scale.y = 1.5;
    door.scale.x = 1.5;
    door.rotation = -25;
    door.layer = -1;


  }
  

  // Door activation: BOTH players must touch it
  if (!levelPassed && door &&
    ((elf.overlapping(door) && rudolph.overlapping(door)) || (rudolph.overlapping(door) && elf.overlapping(door)))) {
    levelPassed = true;
  }

  // Restart
  /*if (kb.presses('r')) {
    gameOver = false;

    elf.pos = { x: 50, y: 500 };
    rudolph.pos = { x: 750, y: 500 };

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
  }*/
}

function onTopOf(a, b) {
  return (
    a.colliding(b) &&            // must be touching
    a.vel.y >= 0 &&              // must be falling or resting
    (a.y + a.h/2) <= (b.y - b.h/4) // must be above the object
  );
}

// Detect if sprite is touching sides and remove friction to allow falling
/*function handleWallFall(s) {
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
}*/

function drawFrame() {
    allSprites.draw();
        
    drawUI();

}

function mouseClicked() {
    if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32 && levelPassed) {
        window.location.href="theendlvl.html";
    }

    if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32 && (levelPassed || timeLeft <= 0)) {
        window.location.reload();
    }
}

function drawUI() {
    noStroke();
    fill(0);
    textSize(18);
    textAlign(LEFT, BASELINE);
    text(`Score: ${score}`, 20, 60);

    // GUI: Timer
    text(`Time Left: ${timeLeft}s`, 20, 30);

    if(timeLeft > 0 && !levelPassed){
      if(time < 0){
        
        timeLeft--;  
        time = 60;
      }
      time--;
    }

    if (levelPassed) {
        if (!levelPassedScreenInitialized) {
            score += timeLeft * 100;
            levelPassSnd.play();

            levelPassedScreenInitialized = true;
        }

        background("#0004")

        textSize(32);
        textAlign(CENTER);
        text(`That's all folks!`, width / 2, height / 2 - 64);

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
            image(homeLevelHoverImg, width / 2 - 84, height / 2 + 100, 64, 64);
        } else {
            image(homeLevelImg, width / 2 - 84, height / 2 + 100, 64, 64);
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
