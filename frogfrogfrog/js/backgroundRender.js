
"use strict";
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

// variation menu aka more of greedy frog 
function drawVariationMenu() {
    background("#d6f5d6");
    // title variation menu
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("More greed...", width / 2, 100);

    // draw Ping Pong  frog and back button that user will be able to click to navigate // leave this function here 
    let hoveringPing = drawButton(pingPongButton);
    let hoveringBack = drawButton(backButton);

}