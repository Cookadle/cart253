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
function drawHill() {
    // The hill is covered in grass
    push();
    fill('#2B8A45');
    noStroke();
    ellipse(750, 640, 1500, 480);
    pop();
function drawHenWing() {
    push();
    stroke(0);
    ellipse(320, 320, 20, 40);
    pop();