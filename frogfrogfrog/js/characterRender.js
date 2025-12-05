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
//welcome to the cast of happy character 
"use strict";
//frog drawing 
////////////////greeedyyy GREEDY FROG 
//Displays the tongue (tip and line connection) and the frog (body)
function drawFrog() {
    // Draw the tongue tip
    if (gameState === "game") {
        push();
        fill("#ff6666");
        noStroke();
        ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
        pop();

        //draw the rest of the tongue
        push();
        stroke("#ff6666");
        strokeWeight(frog.tongue.size / 2);
        line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
        pop();
        
        //draw the frog body
        push();
        fill("#32CD32");
        noStroke();
        //Two body here because i wanted to make my frog look chunky baby
        // body
        ellipse(frog.body.x, frog.body.y - 25, frog.body.size * 1.05, frog.body.size * 0.9);
        // body
        ellipse(frog.body.x, frog.body.y - 30, frog.body.size * 0.9, frog.body.size * 0.75);
        pop();
        

        //eyes
        push();
        fill("#ffffffff");
        stroke("#3d5a3dff");
        strokeWeight(2);
        ellipse(frog.body.x - 32, frog.body.y - 55, 55, 35); // left eye 
        ellipse(frog.body.x + 32, frog.body.y - 55, 55, 35); // right eye

        // pupils 
        fill(0);
        ellipse(frog.body.x - 32, frog.body.y - 55, 30, 18);//left
        ellipse(frog.body.x + 32, frog.body.y - 55, 30, 18);//right
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
/////////////////////TTHIS IS THE FLY NEST ,FLY SlEEP HERE/////////////////////////

// Draws the fly as a black circle 
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
//ping pong fly here
function drawPingFly() {
    push();
    noStroke();
    translate(pingFlyX, pingFlyY);
    //dont forge to add this in new functions

    // wings 
    fill("#96C8FF80")


    rotate(-PI / 6); // tilt diagonally left
    ellipse(-pingFlySize * 0.6, -pingFlySize * 0.2, pingFlySize * 1.1, pingFlySize * 0.55);
    rotate(PI / 3);  // tilt diagonally right
    ellipse(pingFlySize * 0.6, -pingFlySize * 0.2, pingFlySize * 1.1, pingFlySize * 0.55);
    rotate(-PI / 6); // return to center

    // fly whole body beyond wings
    // fly belly
    fill("#1E1E1E");
    ellipse(0, 0, pingFlySize * 1.1, pingFlySize * 0.9);

    // flyhead
    fill("#252424ff");
    ellipse(0, -pingFlySize * 0.45, pingFlySize * 0.75);

    //eyes
    fill("#FF3232");
    ellipse(-pingFlySize * 0.22, -pingFlySize * 0.55, pingFlySize * 0.22);
    ellipse(pingFlySize * 0.22, -pingFlySize * 0.55, pingFlySize * 0.22);

    //highlight eyes
    fill("#FFFFFFDD");
    ellipse(-pingFlySize * 0.26, -pingFlySize * 0.60, pingFlySize * 0.08);
    ellipse(pingFlySize * 0.18, -pingFlySize * 0.60, pingFlySize * 0.08);

    pop();
}
/////////////////////////////////////////////////////////////////////////////////////
////////////////jumpfrog PART THIS IS jumpfrog///////////////////////////////////
function drawJumpFrog() {// im silly n tired of this so this kinda where the game call the function to run the game **to reorganize later or separate into two codes cause im lazy rn**
    background("#87ceeb");
    imageMode(CORNER);
    image(jumpBg, 0, 0, width, height);//grass stuff


    // Draw greedy frog
    push();
    imageMode(CENTER);
    image(frogImg, jumpFrog.x, jumpFrog.y, jumpFrog.size, jumpFrog.size * 1.2);
    pop();
    //draw obstacles //stolen idea from lana potion flies
    for (let obstacle of obstacles) {
        push();
        translate(obstacle.x, obstacle.y); // Move to obstacle's position

        //Random rooooootttttttttation loose variables here put its to make them shake so feels more alive 
        let rotation = random(-PI / 8, PI / 8);
        rotate(rotation);

        //Draw depending on type of obstacle
        if (obstacle.type === "rock") {
            fill("#969696"); //Gray rocks
            noStroke();
            ellipse(0, 0, obstacle.width, obstacle.height);
        } else if (obstacle.type === "log") {
            fill("#8B4513"); //Brownlogs
            noStroke();
            rect(-obstacle.width / 2, -obstacle.height / 2, obstacle.width, obstacle.height);
        } else if (obstacle.type === "spike") {
            fill("#FF0000"); //Red spikes
            stroke(0);
            strokeWeight(2);
            triangle(-obstacle.width / 2, 0, obstacle.width / 2, 0, 0, -obstacle.height);
        }
        pop();

    }
    // Instructions because im too lazy to do a instructions screen
    textAlign(CENTER, TOP);
    fill("#240409ff");
    textSize(16);
    text("↑ = Jump   /  ←  → = Move", width / 2, 30); //freshly coppied from ping pong
    textSize(18);
    fill("#770505ff");
    text("Avoid obstacles !", width / 2, 60);



    //Draw timer+ loose time variables here
    let elapsedTime = Math.floor((frameCount - gameStartTime) / frameRate()); // Time in seconds
    let remainingTime = gameTimer - elapsedTime;
    fill(0);
    textSize(24);
    textAlign(RIGHT);
    text("Time: " + remainingTime + "s", width - 20, 30);

    //ff time runs out
    if (remainingTime <= 0 && !gameEnded) {
        gameEnded = true;
        gameState = "jumpWinner";
    }

    //game runnning
    moveJumpFrog();
    generateObstacles();
    moveObstacles();
}

//////////////////CLICKER FROG///////////////////////
function drawFreeFrog() {
    background("#314b55ff"); // sky blue



    imageMode(CENTER);

    //frog shake on click
    let shakeX = random(-frogShake, frogShake);
    let shakeY = random(-frogShake, frogShake);

    //draw frog
    imageMode(CENTER);
    image(frogImg, width / 2 + shakeX, height / 2 + shakeY, 180, 190);

    //draw jail bars ONLY if frog is still trapped
    if (jailHealth > 0) {
        drawJailBars();
    }
    // Jail HP Bar
    drawJailHP();

    // Win screen
    if (jailHealth <= 0) {
        textSize(32);
        fill("#1e7a2e");
        text("MR.GREEDY IS FREE!!!", width / 2, height / 2 + 150);
        text("Click M", width / 2, height / 2 + 200);
    }

    // Reduce shake every frame
    frogShake = max(0, frogShake - 0.5);
}

// function to draw bars //put it in background render when you come back from being burnout
function drawJailBars() {
    stroke("#000000ff");
    strokeWeight(6);
    let spacing = 60;//space between bars
    //vertical bar
    for (let x = 0; x <= width; x += spacing) {
        line(x, 0, x, height);
    }//horizon bar
    for (let y = 0; y <= height; y += spacing) {
        line(0, y, width, y);
    }
}