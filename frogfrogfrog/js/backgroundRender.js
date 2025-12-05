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
 



///////////////////////////////////////////////////////////////////////////////////////////
Anything related to background assets such as button bg menu etc will be here
*/
"use strict";
//fully commented for pippin
//GREEDY FROG

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

    // Add some text label for main screen tiitle
    fill(0);
    textSize(16);
    text("Press ↑ to launch his tongue!", 200, 30);
    text("Press ←→ to move the frog !", 225, 70);
    text("Press M to return here!", 105, 120);
}
//might need to move this in script file 
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
    //future jeany add this to your other game
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
//greedy frog game over once 3500 reached
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
    text("Click anywhere to return to menu", width / 2, height / 2 + 60);
}



///////////////////////////////////////PING PONG FROG /////////////////////////////////////////////

// draw button and handle hover state
function drawButton(btn) {
    // wll check if the mouse is over the button
    let isHovering = mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h;


    // color based on hover settingss
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
    return isHovering; // just return hover, handle click elsewhere bc itll crash

}
//game over with ai winning 
function showPingPongGameOver() {
    background("#000000ff");

    fill("white");
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2 - 60);

    textSize(18);
    text(pingPongGameOverMessage, width / 2, height / 2);

    textSize(16);
    text("Click anywhere to restart", width / 2, height / 2 + 60);
}
//show winning for ping frog
function showPlayerGameOver() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You won?", width / 2, height / 2 - 60);

    textSize(18);
    text("But at what cost...", width / 2, height / 2 - 40);
    text("Oh Mr.Greedy,I think they are coming for you...", width / 2, height / 2);

    textSize(16);
    text("Click anywhere to restart", width / 2, height / 2 + 60);
    pop();
}

// draw moving spiders in ping pong bg 
function drawSpiders() {
    //loop spider in the spiders array
    for (let spider of spiders) {
        //move spider
        spider.x += spider.speedX;
        spider.y += spider.speedY;

        // bounce off eedges of the canvas
        if (spider.x < spider.size / 2 || spider.x > width - spider.size / 2) spider.speedX *= -1;
        if (spider.y < spider.size / 2 || spider.y > height - spider.size / 2) spider.speedY *= -1;

        push();
        translate(spider.x, spider.y);


        if (rightScore >= 35) {



            //spider evil look i hate it whatever 
            stroke(0);
            strokeWeight(4);
            //legs 
            let legLength = spider.size * 0.7;
            for (let i = -1; i <= 1; i += 2) {
                //top legs 
                bezier(0, 0, legLength * i * 0.5, -legLength * 0.3, legLength * i * 0.7, -legLength * 0.5, legLength * i, -legLength * 0.6);
                bezier(0, 0, legLength * i * 0.5, -legLength * 0.1, legLength * i * 0.8, -legLength * 0.2, legLength * i, -legLength * 0.3);

                //bottom legs 
                bezier(0, 0, legLength * i * 0.5, legLength * 0.3, legLength * i * 0.7, legLength * 0.5, legLength * i, legLength * 0.6);
                bezier(0, 0, legLength * i * 0.5, legLength * 0.1, legLength * i * 0.8, legLength * 0.2, legLength * i, legLength * 0.3);
            }

            //evilspider body
            fill('#FF0000');
            noStroke();
            ellipse(0, 0, spider.size, spider.size);

            // evilspider Eyes
            fill('#FFFFFF');
            ellipse(-spider.size * 0.25, -spider.size * 0.25, spider.size * 0.35, spider.size * 0.35);
            ellipse(spider.size * 0.25, -spider.size * 0.25, spider.size * 0.35, spider.size * 0.35);
            fill('#000000');
            ellipse(-spider.size * 0.25, -spider.size * 0.25, spider.size * 0.12, spider.size * 0.12);
            ellipse(spider.size * 0.25, -spider.size * 0.25, spider.size * 0.12, spider.size * 0.12);

            // Simple Spider Horns they look horrible so commented out for future jeany who might wanna work on this
            /*stroke('#FF0000');
            strokeWeight(6);  

            // left horn 
           line(-spider.size * 0.4, -spider.size * 0.5, -spider.size * 0.7, -spider.size * 1.0);

            // right horn
        line(spider.size * 0.4, -spider.size * 0.5, spider.size * 0.7, -spider.size * 1.0);*/
        }
        else {
            //regular spider look
            push();
            stroke(0);
            strokeWeight(4);
            let legLength = spider.size * 0.7;

            //spider legs
            for (let i = -1; i <= 1; i += 2) {
                //top legs
                bezier(0, 0, legLength * i * 0.5, -legLength * 0.3, legLength * i * 0.7, -legLength * 0.5, legLength * i, -legLength * 0.6);
                bezier(0, 0, legLength * i * 0.5, -legLength * 0.1, legLength * i * 0.8, -legLength * 0.2, legLength * i, -legLength * 0.3);

                //down legs
                bezier(0, 0, legLength * i * 0.5, legLength * 0.3, legLength * i * 0.7, legLength * 0.5, legLength * i, legLength * 0.6);
                bezier(0, 0, legLength * i * 0.5, legLength * 0.1, legLength * i * 0.8, legLength * 0.2, legLength * i, legLength * 0.3);
            }
            pop();
            //never change this part it was hell 
            // Regular spider body 
            fill('#000000');
            ellipse(0, 0, spider.size, spider.size);
            //eyes normal spider
            fill('#FFFFFF');
            ellipse(-spider.size * 0.28, -spider.size * 0.28, spider.size * 0.5, spider.size * 0.5);
            ellipse(spider.size * 0.28, -spider.size * 0.28, spider.size * 0.5, spider.size * 0.5);
            // Pupils for normal spider eye 
            fill('#000000');
            ellipse(-spider.size * 0.28, -spider.size * 0.28, spider.size * 0.22, spider.size * 0.22);
            ellipse(spider.size * 0.28, -spider.size * 0.28, spider.size * 0.22, spider.size * 0.22);
            // highlight 4 eyes 
            fill('#FFFFFF');
            ellipse(-spider.size * 0.33, -spider.size * 0.33, spider.size * 0.08, spider.size * 0.08);
            ellipse(spider.size * 0.23, -spider.size * 0.33, spider.size * 0.08, spider.size * 0.08);

            // Smile 4 normal spider
            stroke('#8a2f64ff');
            strokeWeight(2);
            arc(0, spider.size * 0.15, spider.size * 0.4, spider.size * 0.25, 0, PI);
        }

        pop();
    }
}

function drawPingPongHelp() { //instructions on ping pong screen
    push();
    fill(255);
    textAlign(CENTER);//notneed
    textSize(16);
    text(" Move the paddle with ↑ / ↓", width / 2, 30);
    text("Press M to return to the main menu", width / 2, height - 20);
    pop();
}
//handle the score keeping between ai and player
function drawScorepingpong() {
    if (pingBallX < 0) {
        rightScore += 1; //  player scores a point
        resetPingPong();
    }
    else if (pingBallX > width) {
        leftScore += 1; // fakeai scores a point
        resetPingPong();
    }
    //draw the score on the screen
    push();
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text(leftScore, width / 4, 40);
    text(rightScore, width * 3 / 4, 40);
    pop();

    //ping Pong game over with fakeAI winning 
    if (leftScore >= 30) {
        gameState = "pingpongGameOver";
    }
}
/////////////////JUMP FROG SECTION //////////////////////////////
//losing screen for jump
function showGameOverJump() {
    background("#25421dff");
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);//not needed here NGL but html habits
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(18);
    text("Those spiders are really out to get you eh? I wonder why...", width / 2, height / 2 + 20);
    text("Click to retry", width / 2, height / 2 + 50);
}
//winning screen for jump frog
function showjumpWinner() {
    background("#3242cdff");
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("YOU WON!", width / 2, height / 2 - 40);
    textSize(18);
    text("Congratulations! You avoided all obstacles Mr.Greedy!", width / 2, height / 2 + 40);
    textSize(18);
    fill("#ff0000ff");
    text("You made it to spider jail!", width / 2, height / 2 + 80);
    fill("#212522ff");
    text("Click anywhere to continue", width / 2, height / 2 + 100);
}
/////////////////clicker frog //////////////////////////////////////////
//draw jail bar on top froggy
function drawJailHP() {
    fill("#222");
    rect(width / 2 - 110, 70, 220, 20, 10);
    //draw free him on top of cage bar not behgind 
    push();
    textAlign(CENTER);
    textSize(28);
    fill("#006400");
    stroke("#a3d977");
    strokeWeight(2);
    text("Free the Frog!", width / 2, 40);
    pop();
    //hp bar 
    fill("#ff6060");
    let barWidth = map(jailHealth, 0, maxJailHealth, 0, 220);
    rect(width / 2 - 110, 70, barWidth, 20, 10);
    //instruction cuz me lazy
    fill(255);
    textSize(16);
    text("Click to free him!!! ", width / 2, 105);
}

//////////////////////////////////////buttons///////////////////

// variation menu aka more of greedy frog 
function drawVariationMenu() {
    background("#d6f5d6");
    // title variation menu
    fill(0);
    textSize(32);
    text("More of Mr. Greedy...", width / 2, 50);
    textSize(20);
    text("For optimal storytelling ", width / 2, 410);
    text("Start with Ping Frog", width / 2, 438);
    text("followed by Jump Frog ", width / 2, 465);



    // draw Ping Pong  frog and back button that user will be able to click to navigate // leave this function here 
    let hoveringPing = drawButton(pingPongButton);
    let hoveringBack = drawButton(backButton);
    let hoveringSnake = drawButton(jumpFrogButton);
    let hoveringFree = drawButton(freeFrogButton);
}