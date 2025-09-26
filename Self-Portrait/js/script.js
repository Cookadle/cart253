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
push();
rect(305,560,119,300); //neck
pop();
fill("#dd883dff")
noStroke();

  
//My face
 push();
fill("#b98150ff");

noStroke();
ellipse ( 310,420,400,540);
  
  
//My chiseled chin
triangle (320,780,457, 602, 125,567); //576 good
pop ();
  push();
  
}
function drawEyes(){
push();
ellipse (); 
fill("#")
pop();
}

