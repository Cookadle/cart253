/**
 * Frogfrogfrog
 * 
 * Game directory-
 * script.js              -setup,functions,draw,key controls ,menu CONTROLS/IMPLEMENTATIONS,
 * initialValues.js       -values,variables,array,objects etc
 * backgroundRender.js     -scenary such as the background,score,BUTTONS and ill see what else
 * characterRender.js       -frongs and paddle and fly are in there mostly drawing of the object followed with their moving mecanisms
 * 
 * 
 * 
 * 
 *  A multigame of catching flies in original ways
 * 1.frog cath
 * 2.pingfrog.
 * 3.obstacle frog
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



/* Creates the canvas and start the fly + background color start (sky blue)*/
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();

    bgColor = color("#87ceeb"); // light sky blue start dont remove or game wont start even if you call this later in score
    targetColor = bgColor; //backgroung 

    // give balls n paddle its starting setting
    resetPingPong();
}



//idk where to put this block of code file wise 

function draw() { //where the gamestate come alive
    // main menu
    if (gameState === "menu") {
        drawmenu();
        // variation and the menu button
        drawButton(startButton);
        drawButton(variationButton);
        return;
    }
    //will switch to menu with more option
    if (gameState === "variationMenu") {
        drawVariationMenu();
        return;
    }
    //  when in "game"
    if (gameState === "game") {
        runGame();
        return;
    }
    // ping pong frog mode
    if (gameState === "pingpong") {
        runPingPong();
        return;
    }
    else if (gameState === "gameOver") { //game is done
        showgameOver();
        return;
    }
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

//Resets the fly to the left with a random n change size/speed
function resetFly() {
    // Randomize start so fly paths different
    noiseOffsetX = random(0, 1000);
    noiseOffsetY = random(1000, 2000);

    // fly speed AND size to make it more alive with random
    fly.size = random(8, 14);
    fly.speed = random(3, 9)
}


//PING PONG FROG

function drawPingPongHelp() { //instructions on ping pong screen
    fill(255);
    textAlign(CENTER);
    textSize(16);
    text(" ↑/↓ = right paddle", width / 2, 30);
    text("Press M to return to Menu", width / 2, height - 20);
}
// Resets Ping Pong game n place the ball in  center n give random direction n speed.
function resetPingPong() {
    pingBallX = width / 2;
    pingBallY = height / 2;
    pingBallSpeedX = random([-5, 5]);
    pingBallSpeedY = random([-3, 3]);
}
//Ping Pong controls .The mplayer controls only the right paddle
function keyPressed() {
    if (key === 'm' || key === 'M') {
        gameState = "menu";
        // Reset pingpong variables
        resetPingPong();
        paddleRightY = 200;
        paddleLeftY = 200;
        keys.up = false;
        keys.down = false;
        return; // stop processing
    }

    // Ping Pong controls
    if (gameState === "pingpong") {
        if (keyCode === UP_ARROW) keys.up = true;
        if (keyCode === DOWN_ARROW) keys.down = true;
    }
}

//handle Ping Pong paddle controls when in pingpong state
function keyReleased() {
    if (gameState === "pingpong") {
        if (keyCode === UP_ARROW) keys.up = false;
        if (keyCode === DOWN_ARROW) keys.down = false;
    }
}


// Mouse click handling for menus lord help me
function mousePressed() {

    //main menu clicling
    if (gameState === "menu") {
        // check if mouse inside start game button
        if (mouseX > startButton.x && mouseX < startButton.x + startButton.w &&
            mouseY > startButton.y && mouseY < startButton.y + startButton.h) {
            gameState = "game"; // go to main game
        }

        // check if mouse inside more of greedy frog
        if (mouseX > variationButton.x && mouseX < variationButton.x + variationButton.w &&
            mouseY > variationButton.y && mouseY < variationButton.y + variationButton.h) {
            gameState = "variationMenu"; // go to more of greedy menu
        }
    }

    //more of greedy frog clicking handling menu blabla
    else if (gameState === "variationMenu") {
        // once this is clicked ping pong will start
        if (mouseX > pingPongButton.x && mouseX < pingPongButton.x + pingPongButton.w &&
            mouseY > pingPongButton.y && mouseY < pingPongButton.y + pingPongButton.h) {
            resetPingPong();
            gameState = "pingpong";
        }

        // if back button is clicked it will then go back to menu duh
        if (mouseX > backButton.x && mouseX < backButton.x + backButton.w &&
            mouseY > backButton.y && mouseY < backButton.y + backButton.h) {
            gameState = "menu";
        }
    }

    //idk if i need or want a game over might add the static fly
}