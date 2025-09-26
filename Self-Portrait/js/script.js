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
ellipse ( 308,420,410,540); //my round face
triangle (330,780,457, 602, 125,567); //my chin
pop ();
  
  
}
function drawEyes(){
push();
ellipse (50,50,50,50); 
fill("#0000")
pop();
}

