let floors;
let walls;

function addFloor(x, y, w, h) {
    let newFloor = new floors.Sprite(x, y, w, h, STATIC);

    newFloor.fill="grey";
    newFloor.stroke="grey";

    return newFloor;
}

function addWall(x, y, w, h) {
    let newWall = new walls.Sprite(x, y, w, h, STATIC);

    newWall.fill="grey";
    newWall.stroke="grey";
    newWall.friction = 0;

    return addWall;
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

    addBorders();
}