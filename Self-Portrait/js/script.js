/**
 * The Land of the People
 * Philippe Beauchemin, Dyna Benaziza, Jeany Valcourt
 * 
 * Draws a landscape.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    // A rectangular canvas to work with
    createCanvas(1500, 640);
}

/**
 * Draws a landscape
 */
function draw() {
    // A sky
    background('#8FD6FF');

    drawHill();
    drawSun();
    drawHen();
    drawPig();
    drawTent();

function drawHill() {
    // The hill is covered in grass
    push();
    fill('#2B8A45');
    noStroke();
    ellipse(750, 640, 1500, 480);
    pop();
}

function drawSun() {
    // The sun is yellow
    push();
    fill('#FFFD30');
    noStroke();
    ellipse(320, 100, 140, 140);
    pop();
}

function drawHen() {
    drawHenBody();
    drawHenWing();
    drawHenHead();
    drawHenEye();
    drawHenBeak();
}

function drawHenBody() {
    push();
    fill('#FFFFFF');
    noStroke();
    ellipse(320, 320, 100, 60);
    pop();
}
    
function drawHenWing() {
    push();
    stroke(0);
    ellipse(320, 320, 20, 40);
    pop();
}
    
function drawHenHead() {
    push();
    noStroke();
    ellipse(340, 290, 45);
    pop();
}
    
function drawHenEye() {
    push();
    fill(0);
    ellipse(340, 285, 5);
    pop();
}
    
function drawHenBeak() {
    push();
    fill('#FFA930');
    triangle(360, 280, 365, 285, 360, 290);
    pop();
}
    
function drawPig() {
    drawPigBody();
    drawPigHead();
}

function drawPigBody() {
    push();
    // Body
    // Peppa pig pink
    fill('#C979AD');
    noStroke();
    ellipse(900, 400, 100, 70);
    // Legs
    // Rear legs
    rect(925, 410, 10, 45);
    rect(937, 410, 10, 45);
    // Front legs
    rect(870, 410, 10, 45);
    rect(882, 410, 10, 45);
    pop();
}

function drawPigHead() {
    push();
    fill('#C979AD');
    noStroke();
    // Head
    ellipse(865, 370, 50);
    // Nose
    ellipse(845, 375, 30);
    pop();
    // Nostrils
    push();
    fill(0);
    ellipse(846, 375, 4, 12);
    ellipse(840, 375, 4, 12);
    // Eye
    ellipse(860, 360, 5);
    pop();
}

function drawTent() {
    // Tent
    push();
    fill('#544E4E');
    triangle(1000, 500, 1100, 550, 1050, 200);
    quad(1050, 200, 1350, 200, 1400, 550, 1100, 550);
    pop();
    // Zipper
    push();
    strokeWeight(2);
    line(1050, 200, 1050, 525);
    pop();
}
}