let floor, ceiling, wallL, wallR;
let platform1, platform2movable, platform3Left, platform4Right, platform5Inner;
let platform6, platform7, platform7movable;
let platform8, platform9, movePlatform;
let wallJump1, wallJump2;
let movePlatform2, rudolph, elf, redJumps, blueJumps;

let timeLimit = 120;
let timeLeft = timeLimit;
let time = 120;
let gameActive = true;

let levelPassed = false;
let levelPassedScreenInitialized = false
let continueTimer = true;


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

  movePlatform2 = new Sprite(100, 130, 64, 24, STATIC);
  movePlatform2.image = treeStompImg;
  movePlatform2.image.scale = 3;
  movePlatform2.image.offset = { x: 0, y: 50 };

  movePlatform = new Sprite(200, 575, 64, 24, STATIC);
  movePlatform.image = treeStompImg;
  movePlatform.image.scale = 3;
  movePlatform.image.offset = { x: 0, y: -10 };
}

function setup() {
  createCanvas(800, 600);

  displayMode('normal', 'pixelated');

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
    s.color = 'green';
  }
  
  //The finall button platform
  platform1 = new Sprite(100, 150, 180, 20, STATIC);
  platform1.color = 'red';
  
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
  platform3Left.color = 'green';
  platform4Right.color = 'green';
  platform410Bottom.color = 'red';
  
  //The finish platform
  platform5Inner = new Sprite(platformX, 400, platformW, 10, STATIC);
  platform5Inner.color = 'gold';
  
  platform6 = new Sprite(350, 200, 100, 20, STATIC);
  platform6.color = 'red';
  
  let wallCenterX = 440; //Make sure it's at the same x
  platform7 = new Sprite(wallCenterX, 340, 20, 300, STATIC);
  platform7.color = 'green';

  //First movable door
  platform7movable = new Sprite(wallCenterX, 540, 20, 100, STATIC);
  platform7movable.color = color(50);
  
  platform8 = new Sprite(670, 200, 50, 20, STATIC);
  platform8.color = 'red';
  
  platform9 = new Sprite(650, 500, 220, 20, STATIC);
  platform9.color = 'red';
  
  wallJump1 = new Sprite(550, 250, 20, 200, STATIC);
  wallJump1.color = 'lime';
  wallJump1.textSize = 25;
  wallJump1.text = "^\n^\n^\n^\n^";

  wallJump2 = new Sprite(750, 300, 20, 200, STATIC);
  wallJump2.color = 'lime';
  wallJump2.textSize = 25;
  wallJump2.text = "^\n^\n^\n^\n^";
  
  rudolph.scale.x = 2;
  rudolph.scale.y = 2;
  redJumps = 1;
  
  elf.scale.x = 1;
  elf.scale.y = 1;
  blueJumps = 1;

  //movePlatform.scale.x = 1.3;
  //movePlatform.scale.y = 1.3;
  //movePlatform2.scale.x = 1.3;
  //movePlatform2.scale.y = 1.3;
}

function restartGame() {
  rudolph.pos = { x: 50, y: 560 };
  elf.pos = { x: 100, y: 560 };
  redJumps = 2;
  blueJumps = 2;

  timeLeft = timeLimit;
  time = 60;
  
  platform7movable.y = 540;
  platform2movable.x = 120;

  gameActive = true;
}

function makeGUI(){
    fill('white');
    textSize(18);
    textAlign(LEFT, BASELINE);
    // GUI: Timer
    text(`Time Left: ${timeLeft}s`, 20, 30);
    text(`Score: ${score}`, 20, 60);

    if(continueTimer)
    {
      if(timeLeft > 0){
        if(time < 0){
          
          timeLeft--;  
          time = 60;
        }
        time--;
      }
    }
}

function draw() {
  image(bgImg,0,0);
  
  checkForGift();

  if (kb.pressing('arrow_left')) {
  elf.vel.x = -5;
  elf.scale.x = -1;
  }
  else if (kb.pressing('arrow_right')) {
  elf.vel.x = 5;
  elf.scale.x = 1;
  }
  else { 
    elf.vel.x = 0;
  }

  if(blueJumps > 0 && kb.presses('arrow_up')){
      elf.vel.y = -5;
      blueJumps--;
  }

  if((elf.colliding(platform1) || elf.colliding(floor) || elf.colliding(platform6) || elf.colliding(platform7)
  || elf.colliding(platform8) || elf.colliding(platform9) || elf.colliding(movePlatform)
  || elf.colliding(wallJump1) || elf.colliding(wallJump2) || elf.colliding(movePlatform2)))
  {
    if(elf.velocity.y <= 0)
    {
      blueJumps = 1;
    }
  }

  if (kb.pressing('a')) {
  rudolph.vel.x = -5;
  rudolph.scale.x = -2;
  }
  else if (kb.pressing('d')) {
  rudolph.vel.x = 5;
  rudolph.scale.x = 2;
  }
  else {
  rudolph.vel.x = 0;
  }

  if(redJumps > 0 && kb.presses('w')){
      rudolph.vel.y = -5;
      redJumps--;
  }

  if((rudolph.colliding(platform1) || rudolph.colliding(floor) || rudolph.colliding(platform6) || rudolph.colliding(platform7)
  || rudolph.colliding(platform8) || rudolph.colliding(platform9) || rudolph.colliding(movePlatform)
  || rudolph.colliding(movePlatform2)))
  {
    if(rudolph.velocity.y <= 0)
    {
      redJumps = 1;
    }
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

  if(rudolph.colliding(wallJump1) || rudolph.colliding(wallJump2))
  {
    redJumps = 1;
    if(kb.pressing('a') || kb.pressing('d'))
    {
      rudolph.vel.y = -4;
    }
  }

  if(elf.colliding(wallJump1) || elf.colliding(wallJump2))
  {
    redJumps = 1;
    if(kb.pressing('arrow_left') || kb.pressing('arrow_right'))
    {
      elf.vel.y = -4;
    }
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

  if(rudolph.colliding(platform5Inner) && elf.colliding(platform5Inner))
  {
    levelPassed = true;
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

  if (kb.presses('w') || kb.presses('ArrowUp')) {
      jumpSnd.play();
  }

  textSize(16);
  
  textAlign(RIGHT, BASELINE);
  text(`Hold A or D or the \naccording arrow \nkeys to climb the walls.`, 770, 30);
}

function drawFrame() {
    allSprites.draw();
    makeGUI();
    drawUI();

}

function mouseClicked() {
    if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32 && levelPassed) {
        window.location.href="/hunglvl.html";
    }

    if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32  && (levelPassed || timeLeft <= 0)) {
        window.location.reload();
    }
}

function drawUI() {
    fill('white');
    textSize(18);

    if (levelPassed) {
        continueTimer = false;
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

        if (score >= 1200) {
            image(starImg, width / 2 - 128, height / 2 - 32, 64, 64);
        }

        if (score >= 5000) {
            image(starImg, width / 2 - 32, height / 2 - 32, 64, 64);
        }

        if (score >= 9200) {
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