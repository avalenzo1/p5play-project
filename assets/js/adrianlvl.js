let sprite3, sprite4;

let floor1, roof1;
let wall, wall2;

let gameWall1,gameWall2 , gameWall3; 
let gameFloor1,gameFloor2, gameFloor3, gameFloor4, gameFloor5,
    gameFloor6;

let platform;

let winFloor1, winFloor2;

// let cameraTarget;
// let zoomedIn = false;
// let timeLimit = 90; // seconds
let timeLimit = 60; // seconds
let health = 100;
// let score = 0;
let timeLeft = timeLimit;
let time = 60;

let maxJumps = 1;
let jumps = 0;
let jumps2 = 0;

let rudolph, elf;

function preload() {
    createCanvas(800, 600);

    loadSounds();
    loadIcons();
    // addBorders();
}

function boxLayout(){
  floor1 = new Sprite();
  floor1.color = 'green';
  floor1.x = 400;
  floor1.y = 595;
  floor1.w = 800;
  floor1.h = 5;
  floor1.physics = STATIC;
  floor1.friction = 0;
  
  roof1 = new Sprite();
  roof1.color = 'green';
  roof1.x = 400;
  roof1.y = 5;
  roof1.w = 800;
  roof1.h = 5;
  roof1.physics = STATIC;
  roof1.friction = 0;
  
  wall = new Sprite();
  wall.color = 'green';
  wall.x = 0;
  wall.w = 5;
  wall.h = 580;
  wall.physics = STATIC;
  wall.friction = 0;
  
  wall2 = new Sprite();
  wall2.color = 'green';
  wall2.x = 795;
  wall2.w = 5;
  wall2.h = 600;
  wall2.physics = STATIC;
  wall2.friction = 0;
  
}

function level1Layout(){
    gameWall1 = new Sprite();
    gameWall1.color = 'darkgreen';
    gameWall1.static = true;
    gameWall1.w = 7.5;
    gameWall1.h = 525;
    gameWall1.y = 335;
    gameWall1.friction = 0;
  
    gameWall2 = new Sprite();
    gameWall2.color = 'darkgreen';
    gameWall2.static = true;
    gameWall2.w = 7.5;
    gameWall2.h = 500;
    gameWall2.y = 255;
    gameWall2.x = 480;
    gameWall2.friction = 0;
  
    gameWall3 = new Sprite();
    gameWall3.color = 'darkgreen';
    gameWall3.static = true;
    gameWall3.w = 7.5;
    gameWall3.h = 350;
    gameWall3.y = 355;
    gameWall3.x = 700;
    gameWall3.friction = 0;
  
  // gameFloor1,gameFloor2, gameFloor3;
  
  gameFloor1 = new Sprite();
  gameFloor1.color = 'darkgreen';
  gameFloor1.static = true;
  gameFloor1.w = 340;
  gameFloor1.h = 7.5;
  gameFloor1.y = 500;
  gameFloor1.x = 170;
  gameFloor1.friction = 0;
  
  gameFloor2 = new Sprite();
  gameFloor2.color = 'darkgreen';
  gameFloor2.static = true;
  gameFloor2.w = 340;
  gameFloor2.h = 7.5;
  gameFloor2.y = 400;
  gameFloor2.x = 230.5;//add.5 for the wall is 7.5
  gameFloor2.friction = 0;
  
  gameFloor3 = new Sprite();
  gameFloor3.color = 'darkgreen';
  gameFloor3.static = true;
  gameFloor3.w = 340;
  gameFloor3.h = 7.5;
  gameFloor3.y = 300;
  gameFloor3.x = 170;
  gameFloor3.friction = 0;
  
  gameFloor4 = new Sprite();
  gameFloor4.color = 'darkgreen';
  gameFloor4.static = true;
  gameFloor4.w = 340;
  gameFloor4.h = 7.5;
  gameFloor4.y = 200;
  gameFloor4.x = 230.5;//add.5 for the wall is 7.5
  gameFloor4.friction = 0;
  
  gameFloor5 = new Sprite();
  gameFloor5.color = 'darkgreen';
  gameFloor5.static = true;
  gameFloor5.w = 340;
  gameFloor5.h = 7.5;
  gameFloor5.y = 100;
  gameFloor5.x = 170;
  gameFloor5.friction = 0;
  
  winFloor1 = new Sprite();
  winFloor1.static = true;
  winFloor1.color = 'darkgreen';
  winFloor1.x = 715.5;
  winFloor1.y = 90;
  winFloor1.h = 7.5;
  winFloor1.w = 160;
  winFloor1.friction = 0;
  
  platform = new Sprite(550, 350, 60, 5, KIN);

}

function drawFrame(){
  // camera.x = cameraTarget.x;
  // camera.y = cameraTarget.y;
  // camera.zoom = zoomedIn ? 0.95: 0.5; 
  // camera.y -= 200;
  allSprites.draw();
}

function makePlayers(){
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
    rudolph.x = 110;
    rudolph.y = 550;
    rudolph.changeAni('idle');
    // rudolph.scale = 1.25;

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
    elf.x = 50;
    elf.y = 550;
}

function makeCollects(){
  sprite3 = new Sprite();
  sprite3.static = true;
  sprite3.x = 50;
  sprite3.y = 80;
  sprite3.w = 32;
  sprite3.h = 32;
  sprite3.scale = 2;
  sprite3.image = 'assets/images/sprites/gift.png';
  sprite3.scale = 1;

  sprite4 = new Sprite();
  sprite4.static = true;
  sprite4.x = 750;
  sprite4.y = 250;
  sprite4.scale = 1;
  sprite4.w = 32;
  sprite4.h = 32;
  sprite4.scale = 2;
  sprite4.image = 'assets/images/sprites/gift.png';
  sprite4.scale = 1;
}

function collect(){
  if (rudolph.overlaps(sprite3) || elf.overlaps(sprite3)) {
    score += 100;
      sprite3.remove();
    }
    
    if (rudolph.overlaps(sprite4) || elf.overlaps(sprite4)) {
      score += 500;
      sprite4.remove();
  }
}

function isSpriteTouchingFloor(sprite) {
    const floors = [
        floor1, gameFloor1, gameFloor2, gameFloor3, 
        gameFloor4, gameFloor5, winFloor1, platform
    ];
    
    for (let floor of floors) {
        if (floor && sprite.colliding(floor)) {
            return true;
        }
    }
    
    return false;
}

function playerJumps(){
  resetJumps();
  if(jumps < maxJumps && kb.presses('w')){
    //if(kb.presses('w')){
      rudolph.changeAni('jump');
       rudolph.vel.y = -7;
      jumps++;
      jumpSnd.play();
    //} 
  }
  
  if(jumps2 < maxJumps && kb.presses('arrow_up')){
    //if(kb.presses('up')){
       elf.vel.y = -7;
       elf.changeAni('jump');
      jumps2++;
      jumpSnd.play();
   // }  
  }
}



function playerMovement(){
  if (kb.pressing('a')) {
    rudolph.vel.x = -4;
    rudolph.changeAni('run');
    rudolph.scale.x = -1;
  }
  else if (kb.pressing('d')){
    rudolph.vel.x = 4;
    rudolph.changeAni('run');
    rudolph.scale.x = 1;
    } 
    else {
      rudolph.vel.x = 0;
    }

    if (kb.pressing('arrow_left')) {
      elf.changeAni('run');
      elf.vel.x = -5;
      elf.scale.x = -1;
    }
    else if (kb.pressing('arrow_right')){
      elf.changeAni('run');
      elf.vel.x = 5;
      elf.scale.x = 1;
    }
    else{
      // elf.changeAni('idle');
      elf.vel.x = 0;
    } 
}

function resetJumps(){
  if(rudolph.colliding(floor1) || rudolph.colliding(gameFloor1) || rudolph.colliding(gameFloor2) 
    || rudolph.colliding(gameFloor3) || rudolph.colliding(gameFloor4) || rudolph.colliding(gameFloor5) || rudolph.colliding(platform)
    
    ) {
  jumps = 0;
  rudolph.changeAni('idle');
  }
  
  if(elf.colliding(floor1) || elf.colliding(gameFloor1) || elf.colliding(gameFloor2) 
    || elf.colliding(gameFloor3) || elf.colliding(gameFloor4) || elf.colliding(gameFloor5) || elf.colliding(platform)
    ){
  jumps2 = 0;
  elf.changeAni('idle');
  }
}
function setup() {
   displayMode('normal', 'pixelated');
  // createCanvas(800, 600);
   initializeSprites();
  world.gravity.y = 10;
  
  makePlayers();
  
  makeCollects();
  
  boxLayout();
  level1Layout();
}

function destructor(){
  rudolph.remove();
  elf.remove();
  if (sprite3) {
    sprite3.remove();
  }
  if (sprite4) {
    sprite4.remove();
  }
  floor1.remove();
  roof1.remove();
  wall.remove();
  wall2.remove();
  gameFloor1.remove();
  gameFloor2.remove();
  gameFloor3.remove();
  gameFloor4.remove(); 
  gameFloor5.remove();
  winFloor1.remove();
  gameWall1.remove();
  gameWall2.remove(); 
  gameWall3.remove();
  platform.remove();
  clear();
  background("#fff");
}

function gameOver(){
  noLoop();
  textSize(64);
  textAlign(CENTER);
  clear();
  fill(255);
  destructor();
  circle(400,300,1000);
  fill('black');
  text('Game Over', width / 2, height / 2);
  textSize(32);
  text(`Final Score: ${score}`, width / 2, height / 2 + 64);
}

function mouseClicked() {
  if (dist(mouseX, mouseY, width / 2 - 84 + 32, height / 2 + 100 + 32) <= 32) {
      window.location.href="antlvl.html";
  }
  if (dist(mouseX, mouseY, width / 2 + 16 + 32, height / 2 + 100 + 32) <= 32) {
      window.location.reload();
  }
}

function passedLevel(){
  let timeToScore = timeLeft * 100;
  score += timeToScore;
  clear();
  noLoop();
  levelPassSnd.play();
    textSize(64);
    textAlign(CENTER);
    clear();
    background("#fff");
    fill(255);
    destructor();
    circle(400,300,1000);
    fill('black');
    text('Level Passed', width / 2, height / 2 - 50);
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

    textSize(32);
    text(`Final Score: ${score}`, width / 2, height / 2 + 64);

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

function makeGUI(){
  // GUI: Score
    noStroke();
    fill(0);
    textSize(18);
    text(`Score: ${score}`, 20, 60);

    // GUI: Timer
    text(`Time Left: ${timeLeft}s`, 20, 30);

    if(timeLeft > 0){
      if(time < 0){
        
        timeLeft--;  
        time = 60;//get rid of to test gameOver
      }
      time--;
    }
}

function draw() {
  background(220);
  
  rudolph.rotation = 0;
  elf.rotation = 0;
  
  if (timeLeft === 0) {
    gameOver();
  }else{
    
   playerJumps();
    
    //checks for win
    if(rudolph.colliding(winFloor1) && elf.colliding(winFloor1)){
      // if(rudolph.colliding(gameFloor1) && elf.colliding(gameFloor1)){//testing win screen
       passedLevel();
    }

    makeGUI();
    
    platform.vel.y = cos(frameCount * 2.2) * 7;
    
    collect();//collects sprites and adds to score

    playerMovement();

    //reset the level
    if(kb.presses('r')){
      //restart game;
      rudolph.pos = { x: 50, y: 550 };
      elf.pos = { x: 105, y: 550 };
      time = 60;
      timeLeft = timeLimit;
    }
  }//end of game timer
}