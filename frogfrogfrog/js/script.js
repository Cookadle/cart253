/**
 * Frogfrogfrog
 * 
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";
//score system
let score = 0; // Will count negative eggs from fly mamas eaten by frog

//game states for navigation will start on title screen
let gameState = "menu";

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

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();
  
}

function draw() {
    if (gameState === "menu") {
        drawmenu();
    }
    else if (gameState === "game") {
     runGame();}  
}



function drawmenu() { //a gradiant title screen going from ligth green to dark green 
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
    fill('#9ACC7E')
    rect(220,350,200,50,20) //button start draw

    textSize(25);
    fill("#192E18");
    text("Click to Start",250,385); //text for fake button


}







function runGame() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkInputKeyboard();
}



/**
* Moves the fly according to its speed
* Resets the fly if it gets all the way to the right
*/
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
    //create one for fly going down and not vertically
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog with keyboard input
 */
function moveFrog() {
 // Launch tongue w spacebar click (when not launched yet)
    if (keyIsDown(32) && frog.tongue.state === "idle") {
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

}

/**
 * Handles moving the tongue based on its state
 */
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

//Handles the tongue overlapping the fly
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
    //draw score on screen with text depending on catch
    fill("black");
    textAlign(CENTER);
    textSize(25);
    text("Score : " + score, 130, 50);

}
//Start the game (if it isn't started yet)
function mouseClicked() { //if mouse was clicked game will start
    if (gameState === "menu") {
        gameState = "game";
    }
}

/**
 * Launch the tongue on press r (if it's not launched yet)
 */
/*function mousePressed() {
    
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}*/

 
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

