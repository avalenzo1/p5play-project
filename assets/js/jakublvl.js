let floor, ceiling, wallL, wallR;
let platform1, platform2movable, platform3Left, platform4Right, platform5Inner;
let platform6, platform7, platform7movable;
let platform8, platform9, movePlatform, floorLava;
let wallJump1, wallJump2;
let movePlatform2, sadRed, sadBlue, redJumps, blueJumps;

let timeLimit = 60;
let timeLeft = timeLimit;
let time = 60;
let gameActive = true;

function setup() {
  createCanvas(800, 600);
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
  
  sadRed = new Sprite(50, 560, 40, DYNAMIC);
  sadRed.color = 'red';
  sadRed.stroke = 0;
  sadRed.text = ":(";
  redJump = 1;
  
  sadBlue = new Sprite(100, 560, 40, DYNAMIC);
  sadBlue.color = 'lightblue';
  sadBlue.stroke = 0;
  sadBlue.text = ":(";
  blueJump = 1;
}

function makeGUI() {
  fill(0);
  textSize(24);
  text(`Time Left: ${timeLeft}s`, 630, 30);

  if (timeLeft > 0) {
    if (time < 0) {
      timeLeft--;
      time = 60;
    }
    time--;
  }
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
  sadRed.pos = { x: 50, y: 560 };
  sadBlue.pos = { x: 100, y: 560 };
  redJump = 1;
  blueJump = 1;

  timeLeft = timeLimit;
  time = 60;
  
  platform7movable.y = 540;
  platform2movable.x = 120;

  gameActive = true;
}

function draw() {
  background(220);
  
  if (timeLeft === 0 || !gameActive) {
    gameOver();
    
    if (kb.presses('r')) {
      restartGame();
    }
    return;
  }
  
  makeGUI();

  if (kb.pressing('arrow_left')) sadBlue.vel.x = -5;
  else if (kb.pressing('arrow_right')) sadBlue.vel.x = 5;
  else sadBlue.vel.x = 0;

  if(blueJump >= 1 && kb.presses('arrow_up')){
       sadBlue.vel.y = -5;
      blueJump--;
  }

  if(sadBlue.vel.y >= 0 && (sadBlue.colliding(platform1) || sadBlue.colliding(floor) || sadBlue.colliding(platform6) || sadBlue.colliding(platform7)
  || sadBlue.colliding(platform8) || sadBlue.colliding(platform9) || sadBlue.colliding(movePlatform)
  || sadBlue.colliding(wallJump1) || sadBlue.colliding(wallJump2) || sadBlue.colliding(movePlatform2)))
  {
    blueJump = 1;
  }

  if (kb.pressing('a')) sadRed.vel.x = -5;
  else if (kb.pressing('d')) sadRed.vel.x = 5;
  else sadRed.vel.x = 0;

  if(redJump >= 1 && kb.presses('w')){
       sadRed.vel.y = -5;
      redJump--;
  }

  if(sadRed.vel.y >= 0 && (sadRed.colliding(platform1) || sadRed.colliding(floor) || sadRed.colliding(platform6) || sadRed.colliding(platform7)
  || sadRed.colliding(platform8) || sadRed.colliding(platform9) || sadRed.colliding(movePlatform)
  || sadRed.colliding(wallJump1) || sadRed.colliding(wallJump2) || sadRed.colliding(movePlatform2)))
  {
    redJump = 1;
  }

  if(sadRed.colliding(movePlatform) || sadBlue.colliding(movePlatform) || sadRed.colliding(movePlatform2) || sadBlue.colliding(movePlatform2)){
    if(platform7movable.y > 440){
     platform7movable.y -= 0.7;
    }
  }
  else
  {
    platform7movable.y = 540;
  }

  if(sadRed.colliding(movePlatform2) || sadBlue.colliding(movePlatform2)){
    if(platform2movable.x < 330){
     platform2movable.x += 0.7;
    }
  }
  else
  {
    platform2movable.x = 120;
  }

  if(sadRed.colliding(platform5Inner) || sadBlue.colliding(platform5Inner))
  {
    platform2movable.x = 330;
  }

  if(sadBlue.colliding(floorLava) || sadRed.colliding(floorLava))
  {
    restartGame();
  }

}