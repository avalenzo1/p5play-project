function setup() {
    createCanvas(800, 600);
    
    initializeSprites();
}

const dialogue = [
    "Press the [Enter] key to continue.",
    "Santa is dumb sjdfijblasbdjfihsjdhfbiksdhbfk",
    "hriasehbfisbhdf9bsdifbsodbfib",
    "idk",
    "Santa's elf and and Rudolph must now save Christmas!"
];

let currentLine = 0;
let currentChar = 0;

function mouseClicked() {

}

function draw() {
    background(255);

    fill("#2a2a2aff");
    rect(0, height - 80, width, 80);
    fill("#fff");
    textAlign(CENTER);
    let modified = dialogue[currentLine].slice(0, currentChar);
    text(modified, width / 2, height - 40);

    if (frameCount % 3 == 0) {
        currentChar++;
    }

    if (kb.pressed('Enter')) {
        if (currentLine < dialogue.length - 1) {
            currentLine++;
            currentChar = 0;
        } else {
            window.location.href = "/adrianlvl.html";
        }
    }
}