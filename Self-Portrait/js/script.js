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
  ellipse (540,100,300,100); //eyes
   //my face one color (brown) with subtle countour ,neck and shoulders darker browns and some lines
  push();
  fill("#b98150ff");
  noStroke();
  ellipse ( 350,370,380,540);
  
  triangle (535,403,380,715, 227,576); //576 good
  pop ();
  //rotate the rectangle aka shoulders with neck
  rotate(-6)
  rect(90, 770, 540, 409); // shoulders
  pop(); 
  
  // Rotate the rectangle aka neck even more
  rotate(-5);
  rect(305,560,119,300); //neck
  fill("#dd883dff")
  noStroke();

}
function drawEyes(){
  ellipse(50, 50, 80, 44);
}

