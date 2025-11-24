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

    return addWall;
}

function playerTouchFloor(sprite) {
    
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