let sprite1,sprite2;

let floor1, floor2, floor3;
let wall, wall2;

let platform;

let maxJumps = 2;
let jumps = 0;
let jumps2 = 0;

function setup() {
  // createCanvas(400, 400);//640, 480 
  // createCanvas(640, 480);
  createCanvas(800, 600);
  world.gravity.y = 10;
  
  sprite1 = new Sprite();
  sprite1.w = 20;
  sprite1.h = 40;
  
  sprite2 = new Sprite();
  sprite2.w = 20;
  sprite2.h = 40;
  //sprite.image = '';
  //sprite.physics = ;
  
  
  floor1 = new Sprite();
  floor1.x = 200;
  floor1.y = 395;
  floor1.w = 400;
  floor1.h = 5;
  floor1.physics = STATIC;
  
  floor2 = new Sprite();
  floor2.x = 350;
  floor2.y = 300;
  floor2.w = 100;
  floor2.h = 5;
  floor2.physics = STATIC;
  
  floor3 = new Sprite();
  floor3.x = 375;
  floor3.y = 130;
  floor3.w = 100;
  floor3.h = 5;
  floor3.physics = STATIC;
  
  wall = new Sprite();
  wall.x = 0;
  // wall.y = 0;
  wall.w = 5;
  wall.h = 580;
  wall.physics = STATIC;
  
  wall2 = new Sprite();
  wall2.x = 400;
  // wall2.y = 300;
  wall2.w = 5;
  wall2.h = 400;
  wall2.physics = STATIC;
  
  platform = new Sprite(30, 200, 60, 5, KIN);
}

function draw() {
  background(220);
  
  platform.vel.y = cos(frameCount * 2.2) * 6;
  
  if(floor1.w > 0){
     floor1.w -= 1;
     }
  
 
  if(sprite1.colliding(floor1) || sprite1.colliding(floor2) || sprite1.colliding(floor3)) {
  jumps = 0;
  }
  
  if(sprite2.colliding(floor1) || sprite2.colliding(floor2) || sprite2.colliding(floor3)){
  jumps2 = 0;
  }
  
  
  if(jumps < maxJumps && kb.presses('w')){
    //if(kb.presses('w')){
       sprite1.vel.y = -5;
      jumps++;
    //}  w
  }
  
  if(jumps2 < maxJumps && kb.presses('arrow_up')){
    //if(kb.presses('up')){
       sprite2.vel.y = -5;
      jumps2++;
   // }  
  }
  
  if (kb.pressing('a')) sprite1.vel.x = -5;
else if (kb.pressing('d')) sprite1.vel.x = 5;
else sprite1.vel.x = 0;
  
  if (kb.pressing('arrow_left')) sprite2.vel.x = -5;
else if (kb.pressing('arrow_right')) sprite2.vel.x = 5;
else sprite2.vel.x = 0;
  
  sprite1.rotation = 0;
  sprite2.rotation = 0;
  
  if(kb.presses('r')){
       //restart game;
    sprite1.pos = { x: 100, y: 350 };
    sprite2.pos = { x: 125, y: 350 };
    floor1.w = 410;
     }
  
  
}