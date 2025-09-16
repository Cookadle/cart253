/**
 * Pop up Jeany
 * By Jeany Corrius
 * Draw a self portrait
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

// Creates a rectangular ish canvas

function setup() {
  createCanvas(680, 825);
// Use degrees.
  angleMode(DEGREES);
}

function draw () {
//grey vintage background
background ('#C7C7C7');
 drawFace();



}
function drawFace() {
  //my face one color (brown) with subtle countour ,neck and shoulders darker browns and some lines
  push();
  fill("#B5763F");
  noStroke();
  ellipse ( 350,370,380,540);
  
  triangle (535,403,380,715, 227,576); //576 good
  pop ();
  push();
rect(90, 740, 680, 429); // shoulders
  // Rotate the rectangle aka neck
  rotate(-10);
rect(350,550,110,300); //neck


}
