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
push()
  rotate(-6)
  fill("#dd883dff")
  noStroke();
  rect(90, 770, 540, 409); // shoulders
  rotate(-5); //Rotate the rectangle aka neck even more n create
  rect(305,560,119,300);//neck
  
  pop();


  
//My face
 push();
fill("#b98150ff");
noStroke();
ellipse ( 410,300,410,540); //my round face
triangle (480,720,590,420, 336,560); //my chin
  //quad(20, 50, 80, 30, 80, 70, 20, 70);//potential chin
pop ();
}


function drawEyes(){
push();
fill("#0000")
ellipse (50,50,50,50); 
// Draw eye shape with ellipse, circle, and arc

  // Outer eye shape
  // x, y, width, height
  ellipse(540, 250, 270, 100); //rigth eye
  ellipse(240, 250, 230, 115); //left eye
  // Draw circle as pupil
  // x, y, diameter
  circle(560, 250, 100);
  fill("#0000")
pop();
}

