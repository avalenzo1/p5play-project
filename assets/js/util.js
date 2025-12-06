let floors;
let walls;
let gifts;
let score = 0;
let timer = 60;
let kaFont;
let hohohoSnd, jumpSnd, snowSnd, giftSnd, levelPassSnd, freezeSnd;
let bgAdrianImg, bgAntImg, bgJakubImg, bgHungImg, starImg, voidStarImg, nextLevelImg, nextLevelHoverImg, nextLevelClickedImg, replayLevelImg, replayLevelHoverImg, replayLevelClickedImg, homeLevelImg, homeLevelHoverImg, treeStompImg;

function addFloor(x, y, w, h) {
    let newFloor = new floors.Sprite(x, y, w, h,STATIC);

    newFloor.fill="green";
    newFloor.stroke="green";
    newFloor.friction = 4;

    return newFloor;
}

function addWall(x, y, w, h) {
    let newWall = new walls.Sprite(x, y, w, h, STATIC);

    newWall.fill="green";
    newWall.stroke="green";
    newWall.friction = 0;

    return addWall;
}

function addGift(x, y) {
    let gift = new gifts.Sprite(x, y, 32, 32, KIN);
    gift.image = "/assets/images/sprites/gift.png";

    return gift;
}

function checkForGift() {
    for (let i = 0; i < gifts.length; ++i) {
        if (elf.colliding(gifts[i]) || rudolph.colliding(gifts[i])) {
            gifts[i].remove();
            giftSnd.play();
            score += 100;
        }
    }
}

function touchingWall(sprite) {
    for (let i = 0; i < walls.length; ++i) {
        if (sprite.colliding(walls[i])) return true;
    }
}

function touchingFloor(sprite) {
    for (let i = 0; i < floors.length; ++i) {
        if (sprite.colliding(floors[i])) return true;
    }
}

function addBorders() {
    // Adds walls and floor around canvas
    addFloor(width/2, height - 10, width,20);
    addWall(10, height / 2, 20, height);
    addWall(width-10, height / 2, 20, height);
    addWall(width/2, 10, width,20);
}

function initializeSprites() {
    floors = new Group();
    walls = new Group();
    gifts = new Group();

    kaFont = loadFont('/assets/fonts/ka1.ttf');
    textFont(kaFont);
}

function loadIcons() {
    voidStarImg = loadImage('/assets/images/sprites/voidStar.png');
    starImg = loadImage('/assets/images/sprites/star.png');

    nextLevelImg = loadImage('/assets/images/sprites/nextLevel.png');
    nextLevelHoverImg = loadImage('/assets/images/sprites/nextLevelHover.png');
    nextLevelClickedImg = loadImage('/assets/images/sprites/nextLevelClicked.png');

    replayLevelImg = loadImage('/assets/images/sprites/replayLevel.png');
    replayLevelHoverImg = loadImage('/assets/images/sprites/replayLevelHover.png');
    replayLevelClickedImg = loadImage('/assets/images/sprites/replayLevelClicked.png');

    homeLevelImg = loadImage('/assets/images/sprites/homeLevel.png');
    homeLevelHoverImg =  loadImage('/assets/images/sprites/homeLevelHover.png');
    treeStompImg = loadImage('/assets/images/sprites/treeStomp.png');

    bgAdrianImg = loadImage('/assets/images/sprites/bgAdrian.png');
    bgAntImg = loadImage('/assets/images/sprites/bgAnt.png');
    bgJakubImg = loadImage('/assets/images/sprites/bgJakub.png');
    bgHungImg = loadImage('/assets/images/sprites/bgHung.png');
}

function loadSounds() {
    jumpSnd = loadSound('/assets/sounds/jump.mp3');
    snowSnd = loadSound('/assets/sounds/snow.mp3');
    giftSnd = loadSound('/assets/sounds/gift.mp3');
    levelPassSnd = loadSound('/assets/sounds/levelPass.mp3');
    freezeSnd = loadSound('/assets/sounds/freezing.mp3');
    hohohoSnd = loadSound('/assets/sounds/hohoho.mp3');
}