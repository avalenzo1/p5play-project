let floor, ceiling, wallL, wallR;
let platform1, platform2movable, platform3Left, platform4Right, platform5Inner;
let platform6, platform7, platform7movable;
let platform8, platform9, movePlatform, floorLava;
let wallJump1, wallJump2;
let movePlatform2, rudolph, elf, redJumps, blueJumps;

let timeLimit = 120;
let timeLeft = timeLimit;
let time = 120;
let gameActive = true;

let levelPassed = false;
let levelPassedScreenInitialized = false


function preload() {
    createCanvas(800, 600);

    loadSounds();
    loadIcons();

  rudolph = new Sprite();
  rudolph.spriteSheet = '/assets/images/sprites/rudolphSpriteSheet.png';
  rudolph.anis.frameDelay = 16;
  rudolph.addAnis({
      idle: { row: 0, frames: 1 },
      jump: { row: 1, frames: 1 },
      run: { row: 0, frames: 4 },
  });
  rudolph.x = 50;
  rudolph.y = 560;
  rudolph.rotationLock = true;
  rudolph.width = 32;
  rudolph.height = 32;
  rudolph.changeAni('idle');

  elf = new Sprite(100, 560, 40, DYNAMIC);
  elf.x = 100;
  elf.y = 560;
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
  elf.rotationLock = true;
}

function setup() {
  createCanvas(800, 600);

  initializeSprites();

  addGift(width/2 + 180, height/2 - 20);
  addGift(100, 80);
  
  world.gravity.y = 9.8; 

  let boundaryColors = color(240); 
  
  wallL = new Sprite(5, 300, 10, 600, STATIC);
  wallR = new Sprite(795, 300, 10, 600, STATIC);
  ceiling = new Sprite(400, 5, 800, 10, STATIC);
  floor = new Sprite(400, 595, 800, 10, STATIC);
  
  //Create a group of the the four boundaries
  for (let s of [wallL, wallR, ceiling, floor]) {
    s.color = boundaryColors;
    s.stroke = 0;
    s.strokeWeight = 2;
  }
  
  //The finall button platform
  platform1 = new Sprite(100, 150, 180, 20, STATIC);
  platform1.color = 'white';
  
  //Typical platform size for the finish box
  let platformX = 120;
  let platformW = 200;

  //The last moveable door
  platform2movable = new Sprite(platformX, 250, platformW, 10, STATIC);
  platform2movable.color = color(50);
  
  //The walls for the finish
  platform3Left = new Sprite(platformX - platformW/2 - 5, 330, 10, 170, STATIC);
  platform4Right = new Sprite(platformX + platformW/2 + 5, 330, 10, 170, STATIC);
  platform410Bottom = new Sprite(platformX, 410, platformW, 10, STATIC);
  platform3Left.color = 'white';
  platform4Right.color = 'white';
  platform410Bottom.color = 'white';
  
  //The finish platform
  platform5Inner = new Sprite(platformX, 400, platformW, 10, STATIC);
  platform5Inner.color = 'gold';
  
  platform6 = new Sprite(300, 200, 100, 20, STATIC);
  platform6.color = 'white';
  
  let wallCenterX = 440; //Make sure it's at the same x
  platform7 = new Sprite(wallCenterX, 340, 20, 300, STATIC);
  platform7.color = 'white';

  //First movable door
  platform7movable = new Sprite(wallCenterX, 540, 20, 100, STATIC);
  platform7movable.color = color(50);
  
  platform8 = new Sprite(660, 200, 50, 20, STATIC);
  platform8.color = 'white';
  
  platform9 = new Sprite(650, 500, 220, 20, STATIC);
  platform9.color = 'white';
  
  movePlatform = new Sprite(200, 580, 100, 20, STATIC);
  movePlatform.color = 'mediumpurple';
  movePlatform.text = "STAND1";
  movePlatform.textSize = 15;
  
  wallJump1 = new Sprite(550, 250, 20, 200, STATIC);
  wallJump1.color = 'lime';
  
  wallJump2 = new Sprite(750, 300, 20, 200, STATIC);
  wallJump2.color = 'lime';

  floorLava = new Sprite(660, 490, 100, 10, STATIC);
  floorLava.color = 'orange';
  
  movePlatform2 = new Sprite(100, 140, 80, 20, STATIC); 
  movePlatform2.color = 'mediumpurple';
  movePlatform2.text = "STAND";
  movePlatform2.textSize = 15;
  
  rudolph.scale.x = 1.3;
  rudolph.scale.y = 1.3;
  redJumps = 1;
  
  elf.scale.x = 1.3;
  elf.scale.y = 1.3;
  blueJumps = 1;
}

function gameOver() {
  gameActive = false;

  background(200, 0, 0);
  textSize(72);
  textAlign(CENTER,CENTER);
  fill(255);
  text('TIME UP!', width / 2, height / 2);
  textSize(32);
  text('Press R to restart.', width / 2, height / 2 + 80);
}

function restartGame() {
  rudolph.pos = { x: 50, y: 560 };
  elf.pos = { x: 100, y: 560 };
  redJumps = 1;
  blueJumps = 1;

  timeLeft = timeLimit;
  time = 60;
  
  platform7movable.y = 540;
  platform2movable.x = 120;

  gameActive = true;
}

function makeGUI(){
    fill(0);
    textSize(18);
    textAlign(LEFT, BASELINE);
    // GUI: Timer
    text(`Time Left: ${timeLeft}s`, 20, 30);

    if(timeLeft > 0){
      if(time < 0){
        
        timeLeft--;  
        time = 60;
      }
      time--;
    }
}

function draw() {
  background(220);
  
  checkForGift();
  if (timeLeft === 0 || !gameActive) {
    gameOver();
    
    if (kb.presses('r')) {
      restartGame();
    }
    return;
  }

  if (kb.pressing('arrow_left')) {
  elf.vel.x = -5;
  elf.changeAni('run');
  }
  else if (kb.pressing('arrow_right')) {
  elf.vel.x = 5;
  elf.changeAni('run');
  }
  else { 
    elf.vel.x = 0;
    elf.changeAni('idle');
  }

  if(blueJumps > 0 && kb.presses('arrow_up')){
      elf.vel.y = -5;
      elf.changeAni('jump');
      blueJumps--;
  }
  else
  {
    elf.changeAni('idle');
  }

  if(elf.vel.y >= 0 && (elf.colliding(platform1) || elf.colliding(floor) || elf.colliding(platform6) || elf.colliding(platform7)
  || elf.colliding(platform8) || elf.colliding(platform9) || elf.colliding(movePlatform)
  || elf.colliding(wallJump1) || elf.colliding(wallJump2) || elf.colliding(movePlatform2)))
  {
    blueJumps = 1;
  }

  if (kb.pressing('a')) {
  rudolph.vel.x = -5;
  rudolph.changeAni('run');
  }
  else if (kb.pressing('d')) {
  rudolph.vel.x = 5;
  rudolph.changeAni('run');
  }
  else {
  rudolph.vel.x = 0;
  rudolph.changeAni('idle');
  }

  if(redJumps > 0 && kb.presses('w')){
      rudolph.vel.y = -5;
      rudolph.changeAni('jump');
      redJumps--;
  }
  else
  {
    rudolph.changeAni('idle');
  }

  if(rudolph.vel.y >= 0 && (rudolph.colliding(platform1) || rudolph.colliding(floor) || rudolph.colliding(platform6) || rudolph.colliding(platform7)
  || rudolph.colliding(platform8) || rudolph.colliding(platform9) || rudolph.colliding(movePlatform)
  || rudolph.colliding(wallJump1) || rudolph.colliding(wallJump2) || rudolph.colliding(movePlatform2)))
  {
    redJumps = 1;
  }

  if(rudolph.colliding(movePlatform) || elf.colliding(movePlatform) || rudolph.colliding(movePlatform2) || elf.colliding(movePlatform2)){
    if(platform7movable.y > 440){
     platform7movable.y -= 0.7;
    }
  }
  else
  {
    platform7movable.y = 540;
  }

  if(rudolph.colliding(movePlatform2) || elf.colliding(movePlatform2)){
    if(platform2movable.x < 330){
     platform2movable.x += 0.7;
    }
  }
  else
  {
    platform2movable.x = 120;
  }

  if(rudolph.colliding(platform5Inner) || elf.colliding(platform5Inner))
  {
    platform2movable.x = 330;
  }

  if(rudolph.colliding(floorLava))
  {
    rudolph.pos = { x: 50, y: 560 };
  }

  if(elf.colliding(floorLava))
  {
    elf.pos = { x: 100, y: 560 };
  }

  if(rudolph.colliding(platform5Inner) && elf.colliding(platform5Inner))
  {
    levelPassed = true;
  }

  if (kb.presses('w') || kb.presses('ArrowUp')) {
      jumpSnd.play();
  }
}

function drawFrame() {
    allSprites.draw();
    makeGUI();
    drawUI();

}

function mouseClicked() {
    if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32) {
        window.location.href="/hunglvl.html";
    }

    if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32) {
        window.location.reload();
    }
}

function drawUI() {
    fill(0);
    textSize(18);

    if (levelPassed) {
        if (!levelPassedScreenInitialized) {
            score += timeLeft * 100;
            levelPassSnd.play();

            levelPassedScreenInitialized = true;
        }

        background("#0004")

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
}