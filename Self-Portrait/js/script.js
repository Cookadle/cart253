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
drawBase();
drawEyes();
}

function drawBase() {
//Rotate the rectangle aka shoulders with neck and create it
rotate(-6)
rect(90, 770, 540, 409); // shoulders
//Rotate the rectangle aka neck even more n create
rotate(-5);
rect(305,560,119,300); //neck
fill("#dd883dff")
noStroke();
  
//My face
 push();
  fill("#b98150ff");
  noStroke();
  ellipse ( 320,370,380,540);
  
//My chiseled chin
triangle (504,460,400,715, 190,589); //576 good
pop ();
  push();
  
}
function drawEyes(){
push();
ellipse (540,100,300,100); 
fill("##f2efed")
pop();
}

