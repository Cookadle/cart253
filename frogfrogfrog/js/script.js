/**
 * Frogfrogfrog :The Saga
 * 
 * Game directory-
 * script.js                -setup,functions,draw,key controls ,menu CONTROLS/IMPLEMENTATIONS,
 * initialValues.js         -values,variables,array,objects etc
 * backgroundRender.js      -scenary such as the background,score,BUTTONS and ill see what else
 * characterRender.js       -frongs , paddle and fly are in there mostly drawing of the object followed with their moving mecanisms like move tongue
 * p5.min.js                - p5 main library
 * p5.sound.min.js          - p5 sound library
 * index.html               - html file
 * images folder            -all images asre stored here
 * sounds folder            -all sound effects or music will be kept here
 * 
 *  A multigame of catching flies in original ways
 * 1.frog cath
 * 2.pingfrog.
 
 * Original concept by : Pippin Bar
 * Modded by : Jeany Corrius 
 * 
 * Instructions for Greedy Frog:
 * - Move the frog with the left right key arrows
 * - Press up arrow to launch the tongue
 * - Catch flies until you can't
 * 
 * Instructions for Ping Pong Frog :
 * -Move the paddle with the up and down key arrows
 * -Catch the flies
 * 
 * Made with p5
 * https://p5js.org/
 */
//this where i run this game and the likes 

"use strict";



/* Creates the canvas and start the fly + background color start (sky blue)*/
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetFly();
    //same but for pingpong frog
    resetPingFly();


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


//the game of ping pong start here 
function runPingPong() {
    background("#bbe6a1ff");
    // darken screen if player score >= 25
    if (rightScore >= 25) {
        push();
        noStroke();
        fill(0, 50);
        rect(0, 0, width, height);
        pop();
    }


    // Ball for ping pong
    fill(255);
    imageMode(CENTER);
    image(pingBallImg, pingBallX, pingBallY, 60, 60); // x, y, width, height reminder for myself cause i always forget
    // faster ball speed n AI paddle speed when player score reaches number(15 or 30 idk )
    if (rightScore >= 15) {
        pingBallSpeedX = pingBallSpeedX > 0 ? 8 : -8; // faster speed hor
        pingBallSpeedY = pingBallSpeedY > 0 ? 5 : -5; // faster speed vert
        aiSpeed = 6; // faster AI
    }



    // Right paddle (player controlled with up down keys )
    //  adjust the speed here too 
    if (keys.up) paddleRightY -= 5;
    if (keys.down) paddleRightY += 5;

    // Keep paddle inside the screen just like frog
    paddleRightY = constrain(paddleRightY, 0, height - 80);

    // Draw right paddle 
    rect(width - 30, paddleRightY, 10, 80);





    // Left paddle (kinda ai controlled) aiSpeed controls difficulty of ai paddle
    //speed adjust here
    if (pingBallY < paddleLeftY + 40) {
        paddleLeftY -= aiSpeed;

    } else if (pingBallY > paddleLeftY + 40) {
        paddleLeftY += aiSpeed;
    }


    // AI paddle inside constrained like frogy
    paddleLeftY = constrain(paddleLeftY, 0, height - 80);


    // draw left paddle
    rect(20, paddleLeftY, 10, 80);


    // ball movement x=horizontal y=vertical
    pingBallX += pingBallSpeedX;
    pingBallY += pingBallSpeedY;



    // will reverse in the y direction when hit bottom or top also collision
    if (pingBallY < 10 || pingBallY > height - 10) {
        pingBallSpeedY *= -1;
    }

    // collision for left paddle
    if (pingBallX < 30 &&
        pingBallY > paddleLeftY &&
        pingBallY < paddleLeftY + 80) {
        pingBallSpeedX *= -1;
    }

    //collision for right paddle
    if (pingBallX > width - 40 &&
        pingBallY > paddleRightY &&
        pingBallY < paddleRightY + 80) {
        pingBallSpeedX *= -1;
    }




    
    //ping pong fly get drawn then he check distance will be running 
    drawPingFly();
    updatePingFly();

    // Draw  instructions 
    drawPingPongHelp();
    //handle score 
    drawScorepingpong();
}
function drawPingPongHelp() { //instructions on ping pong screen
    fill(255);
    textAlign(CENTER);
    textSize(16);
    text(" Move the paddle with ↑ / ↓", width / 2, 30);
    text("Press M to return to the main menu", width / 2, height - 20);
}
// Resets Ping Pong game n place the ball in  center n give random direction n speed.
function resetPingPong() {
    pingBallX = width / 2;
    pingBallY = height / 2;
    pingBallSpeedX = random([-5, 5]);
    pingBallSpeedY = random([-3, 3]);
}
//handle the score keeping between ai and player
function drawScorepingpong() {
    if (pingBallX < 0) {
        rightScore += 1; //  player scores a point
        resetPingPong(); // Reset the ball position
    }
    else if (pingBallX > width) {
        leftScore += 1; // ai player scores a point
        resetPingPong(); // Reset the ball position
    }
    // Draw the score on the screen
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text(leftScore, width / 4, 40);
    text(rightScore, width * 3 / 4, 40);
}
//my little ping pong fly is reset here
function resetPingFly() {
    pingFlyX = random(50, width - 50);
    pingFlyY = random(50, height - 50);
}
//Handles the logic for the Ping Pong fly
// Checks ball overlaps w fly then get point n fly get respawn elsewhere
function updatePingFly() {
    let d = dist(pingBallX, pingBallY, pingFlyX, pingFlyY);

    // If ball hits fly ,score goes up n respawn
    if (d < 30 + pingFlySize / 2) {
        rightScore += 1;
        resetPingFly();
    }
}


//Ping Pong controls .The mplayer controls only the right paddle
function keyPressed() {
    if (key === 'm' || key === 'M') {
        gameState = "menu";
        // Reset pingpong PADDLES
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


























///////////////MEEEEENUUUUUUS/////////////////////////////////////////////////

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
            resetPingFly();
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