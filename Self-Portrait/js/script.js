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
    pop()