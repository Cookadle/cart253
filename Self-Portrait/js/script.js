
/**
 * Pop up Jeany
 * By Jeany Corrius
 * Draw a self portrait
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

//function preload(){
//WinXP = loadImage('images/retro.jpg')
//}

// Creates a rectangular ish canvas

function setup() {
  createCanvas(680, 825);
  
// Use degrees.
  angleMode(DEGREES);
}

function draw () {
//grey vintage background
background ('#C7C7C7');

//image(WinXP,69,67{,300,400)
drawBase();
drawEyes();
drawNose();

}

  
function drawBase() { //draw the foundation of face n neck

push()
  rotate(-6) //Rotate the rectangle aka shoulders with neck and create it
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
triangle (480,730,590,430, 235  ,450); //my chin
  //quad(20, 50, 80, 30, 80, 70, 20, 70);//potential chin
pop ();
}


function drawEyes(){
push();
fill("#F0E2A8")
 //  draw Outer eye shape
 ellipse(540, 200, 270, 100); //Blanc d.oeil right
  ellipse(240, 250, 230, 115); //left blanc d"oeil
  pop();


  push();
 //draw pupils 
  circle(560, 200, 100); //right pupil
  noStroke();
  pop();

  circle(240, 250, 100); //left eye
  noStroke();


   //draw eyelidss
  push();
fill("#50717a")
    arc(540, 200, 275, 100, 180, 360, CHORD); //right eyelids
  arc(240, 250, 235, 150, 180, 360, CHORD); //left eyelids
pop();
  fill("#")

}