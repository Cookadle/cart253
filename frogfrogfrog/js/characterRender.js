










"use strict";

//frog drawing 

//Displays the tongue (tip and line connection) and the frog (body)
function drawFrog() {
    // Draw the tongue tip
    if (gameState === "game") {
        push();
        fill("#ff6666");
        noStroke();
        ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
        pop();

        // Draw the rest of the tongue
        push();
        stroke("#ff6666");
        strokeWeight(frog.tongue.size / 2);
        line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
        pop();

        // Draw the frog's body
        push();
        fill("#32CD32");
        noStroke();
        ellipse(frog.body.x, frog.body.y, frog.body.size, frog.body.size * 1.3);
        pop();

        //eyes
        push();
        fill("#ffffffff");                
        stroke("#3d5a3dff");        
        strokeWeight(2);
       ellipse(frog.body.x - 25, frog.body.y - 55, 40, 50); // left eye 
        ellipse(frog.body.x + 25, frog.body.y - 55, 40, 50); // right eye

        //pupila
        fill(0);                
        ellipse(frog.body.x - 25, frog.body.y - 55, 20);
        ellipse(frog.body.x + 25, frog.body.y - 55, 20);
        pop();

    }
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
/////////////////////TTHIS IS THE FLY PART ,FLY STAY HERE/////////////////////////

// Draws the fly as a black circle 
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}





////////////////PING PONG PART THIS IS PING PONG PART///////////////////////////////////

//the game of ping pong start here
function runPingPong() {
    background("#A5DB84");

    // Ball for ping pong
    fill(255);
    imageMode(CENTER);
    image(pingBallImg, pingBallX, pingBallY, 60, 60); // x, y, width, height reminder for myself cause i always forget

    // Right paddle (player controlled with up down keys ) adjust the speed here too 
    if (keys.up) paddleRightY -= 5;
    if (keys.down) paddleRightY += 5;

    // Keep paddle inside the screen just like frog
    paddleRightY = constrain(paddleRightY, 0, height - 80);

    // Draw the paddle (on the right)
    rect(width - 30, paddleRightY, 10, 80);

    // Left paddle (kinda ai controlled) - Move paddle toward the ball y position  and aiSpeed controls difficulty of ai paddle
    // If ball is above the paddle go up
    if (pingBallY < paddleLeftY + 40) {
        paddleLeftY -= aiSpeed;

    // If ball below the paddle center go down
    } else if (pingBallY > paddleLeftY + 40) {
        paddleLeftY += aiSpeed;
    }
    // AI paddle inside constrained
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

    // Reset if ball is out
    if (pingBallX < 0 || pingBallX > width) {
        resetPingPong();
    }
    // Draw  instructions 
    drawPingPongHelp();
}
