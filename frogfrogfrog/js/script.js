/**
 * Frogfrogfrog
 * 
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with the left right key arrows
 * - Press up arrow to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
//game states for navigation will start on title screen
let gameState = "menu";

// 🟩 Menu Start Button
let startButton = {
    x: 220,
    y: 350,
    w: 200,
    h: 50,
    cornerRadius: 20,
    baseColor: '#9ACC7E',     // normal
    hoverColor: '#B5E68C',    // when hovered
    textColor: '#192E18',
    label: "Click here to start"
};

// Track mouse press state (so we only trigger once per click)
let wasMousePressed = false;
//score system
let score = 0;

//background and fading
let bgColor;
let targetColor;

//Perlin noise (future jeany remember to set them far apart so they arent the same)
let noiseOffsetX = 0;
let noiseOffsetY = 1000;



//music time
let titleMusic;
let gameMusic;


//let images of spidey BE
let spideytop;
let spideybottom;
let spideyleft;
let spideyright;

// Load all the images.
function preload() {
    spideytop = loadImage('./assets/images/SpiderTop.png');
    spideyleft = loadImage('./assets/images/SpiderLeft.png');
    spideyright = loadImage('./assets/images/SpiderRight.png');
    spideybottom = loadImage('./assets/images/SpiderBottomnDetail.png');

    //music n sounds
    titleMusic = loadSound('./assets/sounds/calmbeat.mp3');
    gameMusic = loadSound('./assets/sounds/game.mp3');



}

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    }
    ,
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/* Creates the canvas and initializes the fly*/
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();
    bgColor = color("#87ceeb"); // light sky blue start
    targetColor = bgColor;
}


function drawButton(btn) {
    // Check if the mouse is over the button
    let isHovering = mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h;

    // Choose color based on hover
    fill(isHovering ? btn.hoverColor : btn.baseColor);
    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, btn.cornerRadius);

    // Button text
    fill(btn.textColor);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);

    // Cursor change for feedback
    if (isHovering) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }

    // Return whether the button was clicked this frame
    let clicked = false;
    if (isHovering && mouseIsPressed && !wasMousePressed) {
        clicked = true;
    }

    // Update click tracking
    wasMousePressed = mouseIsPressed;

    return clicked;
}
function startGame() {
    // Switch game state
    gameState = "game";

    // Stop menu music and start game music (optional)
    if (titleMusic.isPlaying()) {
        titleMusic.stop();
    }
    if (!gameMusic.isPlaying()) {
        gameMusic.loop();
    }

    // Reset the frog and score
    frog.body.x = width / 2;
    frog.body.y = height - 50;
    frog.tongue.y = frog.body.y - 40;
    frog.tongue.state = "idle";
    score = 0;
}



function draw() { //where the gamestate come alive

    if (gameState === "menu") { //will be at title scren
        drawmenu();
    }
    // Draw button n check  click
    let clicked = drawButton(startButton);


    // If clicked, change state
    if (clicked && gameState === "menu") {
        console.log("Button clicked! Starting game...");
        gameState = "game";
    }

    //  when in "game"
    if (gameState === "game") { //will be in game
        runGame();
    }
}

/*else if (gameState=== "over") { //will be over
    runOver();
}*/


//a gradiant title screen going from ligth green to dark green+Click here to start function 
function drawmenu() {
    rectMode();

    colorMode(HSB);
    noStroke();
    // Top color Hue: 100°, Saturation: 90%, Brightness: 100%
    let colorA = color(150, 90, 100);
    // Bottom color
    let colorB = color(120, 80, 20);
    //stripes
    let stripeCount = 7;
    // Divide height of canvas by number of stripes
    let stripeHeight = height / stripeCount;
    // Start at top of canvas, repeat to bottom n move down by stripeHeight each time,
    for (let y = 0; y < height; y += stripeHeight) {
        // Convert y position to number between  0 (top of canvas) and 1 (bottom of canvas)
        let fadeAmount = y / height;
        // Interpolate color
        let betweenColor = lerpColor(colorA, colorB, fadeAmount);
        // Draw stripe
        fill(betweenColor);
        rect(0, y, width, stripeHeight);
    }


}




function runGame() { //will let the game  start once game state is different

    //thank you geek for geeks and w3school and reddit .reddit the most love you nerds
    //background will change with score
    if (score > -100) {
        targetColor = color("#aef2ff"); // very light blue (OH HAPPY DAYYYYYY)
    }
    else if (score <= -100 && score > -300) {
        targetColor = color("#9ee7d5"); // mint green(HUH)
    }
    else if (score <= -300 && score > -600) {
        targetColor = color("#b5f68d"); // light green(HMMM)
    }
    else if (score <= -600 && score > -900) {
        targetColor = color("#f6e48d"); // yellow(WAIT...)
    }
    else if (score <= -900 && score > -1300) {
        targetColor = color("#f6b68d"); // orange(OH LORD)
    }
    else if (score <= -1300 && score > -1700) {
        targetColor = color("#f68d8d"); // redish pink(WAT)
    }
    else if (score <= -1700 && score > -2300) {
        targetColor = color("#c34b4b"); // darker red (AH SXIT)
    }
    else if (score <= -2300 && score > -3000) {
        targetColor = color("#632a2a"); // deep brown-red (WAIT WAIT SPIDEY)
    }
    else {
        targetColor = color("#0f0f0f"); // near black (DEAD?)
    }
    //  fade between colors
    bgColor = lerpColor(bgColor, targetColor, 0.02);
    // draw background
    background(bgColor);


    //regular fonction (organizing myself )
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();


    checkTongueFlyOverlap();
    checkInputKeyboard();

    // 🕷️ Show spider image once score is in a certain range
    if (score <= -250 && score > -600) {
        image(spideytop, -5, 0, 600, 350);
    }
    else if (score <= -600 && score > -1200) {
        image(spideyleft, -5, 0, 600, 350);
    }
    else if (score <= -1200 && score > -2000) {
        image(spideyright, 15, 0, 600, 450);
    }
    else if (score <= -2000) {
        image(spideybottom, -5, 0, 600, 600);
    }

    //Write score on corner left screen
    fill("black");
    textAlign(CENTER);
    textSize(25);
    text("Score : " + score, 130, 50);
}




/* draw void of spiders
 game state = game over
 display text 
 
     
}

/* Moves the fly according to its speed  Resets the fly if it gets all the way to the right*/
function moveFly() {
    // Perlin noise movement
    fly.x = noise(noiseOffsetX) * width;
    fly.y = noise(noiseOffsetY) * 300; // vertical range for motion

    // Increment noise which impact motion
    noiseOffsetX += 0.01;
    noiseOffsetY += 0.01;

    // Handle the fly going off the canvas
    if (fly.x > width - 10) {
        resetFly();
    }
}


// Draws the fly as a black circle

function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

//Resets the fly to the left with a random y
function resetFly() {
    // Randomize start so fly paths different
    noiseOffsetX = random(0, 1000);
    noiseOffsetY = random(1000, 2000);

    // Optional: adjust fly speed or size to vary behavior a bit
    fly.size = random(8, 14);
}

//Moves the frog with keyboard input + constraint body so not off screen
function moveFrog() {
    // Launch tongue up arrow r click (when not launched yet)
    if (keyIsDown(UP_ARROW) && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
    // Move the frog to the left with left arrow key when pressed
    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x -= 5;
    }
    // Move the frog towards the right when the right arrow key is pressed
    if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x += 5;
    }
    // Constrain the frog position
    frog.body.x = constrain(frog.body.x, 0, 640);
}

// Handles moving the tongue based on its state 
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

//Displays the tongue (tip and line connection) and the frog (body)
function drawFrog() {
    // Draw the tongue tip
    if (gameState === "game") {
        push();
        fill("#ff0000");
        noStroke();
        ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
        pop();

        // Draw the rest of the tongue
        push();
        stroke("#ff0000");
        strokeWeight(frog.tongue.size);
        line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
        pop();

        // Draw the frog's body
        push();
        fill("#00ff00");
        noStroke();
        ellipse(frog.body.x, frog.body.y, frog.body.size);
        pop();
    }
}

//Handles the tongue overlapping the fly + score value n display.Why here and not in run game you ask? I DONT KNOW 
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //Add point to score + floor round them up
        score += floor(random(-7, -150));
    }
}

//Check keyboard inputs for froggy
function checkInputKeyboard() {
    // Launch the tongue with up key (if it's not launched yet)
    if (keyIsDown(UP_ARROW) && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
    // Move the frog to left when the left arrow key is down
    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x -= 3;
    }
    // Move the frog to right when the right arrow key is down
    if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x += 3;
    }

}

