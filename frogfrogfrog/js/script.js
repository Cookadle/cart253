/**
 * Frogfrogfrog
 * 
 * 
 * A game of catching flies with your frog-tongue
 * Original concept by : Pippin Bar
 * Modded by : Jeany Corrius 
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

//Start Button
let startButton = {
    x: 220,
    y: 350,
    w: 200,
    h: 50,
    cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',// when hovered
    textColor: '#192E18',
    label: "Click here to start"
}

let gameOver = false;
let gameOverMessages = [
    "Such a greedy frog you are,you just couldn't stop",
    "My my my,your greediness got you killed eh",
    "God lord think of all those larvae eggs you ate",
    "Oh froggy,you are just the greediest",

];
 let isGameOver = false;

let currentGameOverMessage = "";

// mouse press state (so we only trigger once per click)
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
let upkey;
let movingkey;
//let gameMusic;

// Load all the images.
function preload() {
    spideytop = loadImage('./assets/images/SpiderTop.png');
    spideyleft = loadImage('./assets/images/SpiderLeft.png');
    spideyright = loadImage('./assets/images/SpiderRight.png');
    spideybottom = loadImage('./assets/images/SpiderBottomnDetail.png');
    upkey = loadImage('./assets/images/upkey.png')
    movingkey = loadImage('./assets/images/Movingkey.png')

    //music n sounds

    //gameMusic = loadSound('./assets/sounds/funkybeat.mp3');



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

/* Creates the canvas and initializes the fly + background color start (sky blue)*/
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();

    bgColor = color("#87ceeb"); // light sky blue start dont remove or game wont start even if you call this later in score
    targetColor = bgColor; //backgroung 

}


function drawButton(btn) {
    // wll check if the mouse is over the button
    let isHovering = mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h;

    // Choose color based on hover settingss
    fill(isHovering ? btn.hoverColor : btn.baseColor);
    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, btn.cornerRadius);

    // button text positioning
    fill(btn.textColor);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);

    // Cursor change 
    if (isHovering) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }

    //whether the button was clicked 
    let clicked = false;
    if (isHovering && mouseIsPressed && !wasMousePressed) {
        clicked = true;
    }

    // Update click tracking
    wasMousePressed = mouseIsPressed;

    return clicked;
}





function draw() { //where the gamestate come alive

    if (gameState === "menu") { //will be at title scren
        drawmenu();
    }
    // Draw button n check  click
    let clicked = drawButton(startButton);


    // If clicked, change state
    if (clicked && gameState === "menu") {

        gameState = "game";
    }

    //  when in "game"
    if (gameState === "game") { //will be in game
        runGame();
    }

  else if (gameState === "gameOver") { //game is done
     showgameOver();
}
}




//a gradiant title screen going from ligth green to dark green 
function drawmenu() {

    rectMode();

    colorMode(HSB);
    noStroke();
    // Top color Hue: 100°, Saturation: 90%, Brightness: 100%
    let colorA = color(150, 90, 100);

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
    image(upkey, 50, 10, 40, 40);
    image(movingkey, 25, 55, 90, 40);
    // Add some text label
    fill(0);
    textSize(16);
    text("Press ↑ to launch his tongue!", 200, 30);
    text("Press ←→ to move the frog !", 225, 70);
}

function runGame() { //will let the game  start once game state is different / BACKGROUND N SCORE CHANGE IN HERE

    //thank you geek for geeks and w3school and reddit .reddit the most love you nerds
    //background will change with score BACKGROUND CHANGE 
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

    // no cursor ingame will disseaper once in canvas
    noCursor();

    //regular fonction (organizing myself )
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();


    checkTongueFlyOverlap();
    checkInputKeyboard();


//spider START CRAWLING  once score is in a certain range + game over condition
if (score <= -3000) {
    gameState = "gameOver";
    return; // stop updating game
}
else if (score <= -250 && score > -600) {
    image(spideytop, 5, 0, 750, 350);
}
else if (score <= -600 && score > -1200) {
    image(spideyleft, 5, 0, 750, 350);
}
else if (score <= -1200 && score > -2000) {
    image(spideyright, 5, 0, 750, 350);
}
else if (score <= -2000 && score > -3000) {
    image(spideybottom, 0, 0, 600, 600);
}



    //Write score on corner left screen
    fill("black");
    textAlign(CENTER);
    textSize(25);
    text("Score : " + score, 130, 50);

}

function showgameOver() {
    background("#240303ff");

    // choose a random message once
    if (!isGameOver) {
        currentGameOverMessage = random(gameOverMessages);
        isGameOver = true;
    }

    fill("white");
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2 - 60);

    textSize(18);
    text(currentGameOverMessage, width / 2, height / 2);

    textSize(16);
    text("Click anywhere to restart", width / 2, height / 2 + 60);
}





/* Moves the fly with perlinnoise */
function moveFly() {
    // Perlin noise movement
    fly.x = noise(noiseOffsetX) * width;
    fly.y = noise(noiseOffsetY) * 300; // vertical range for motion

    // Increment noise which impact motion pf the fly movements ehhhh
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

//Resets the fly to the left with a random n change size/speed
function resetFly() {
    // Randomize start so fly paths different
    noiseOffsetX = random(0, 1000);
    noiseOffsetY = random(1000, 2000);

    // fly speed AND size to make it more alive with random
    fly.size = random(8, 14);
    fly.speed = random(3, 9)
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
    // Constrain the frog position to not go off canvas
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
        //draw eyes

        push();
        noStroke();
        circle()
    }
}

//Handles the tongue overlapping the fly + score value n display.Why here and not in run game you ask? I DONT KNOW k
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

function mousePressed() {
    if (gameState === "gameOver") {
        score = 0;
        gameState = "menu";
        frog.tongue.state = "idle";
        frog.body.x = 320;
        frog.tongue.y = 480;
        isGameOver = false; // reset flag so new message appears next time
    }
}
