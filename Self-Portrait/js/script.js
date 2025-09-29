
/**
 * Pop up Jeany
 * By Jeany Corrius
 * Draw a self portrait
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

let img;

function preload(){
img=loadImage('./assets/retro.jpg');
}

function setup() {
  createCanvas(680, 825); // Creates a rectangular ish canvas
  background ('#C7C7C7'); //grey vintage background
  angleMode(DEGREES); // Use degrees.
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER); //its the windows xp background babyyyy
}

function draw () {
drawBase();
drawEyes();
drawLips();
drawEmoji();
drawMenu();

}

function drawLips(){ //time to draw them lips
push ();
fill("#8C0606")
  triangle(340,550,375,500,450,550); //top lips left
  triangle(520,520,400,560,460,490); //top lips right
fill("#912626")
  triangle(459,625,520,  520, 360, 550); //bottom lips 
pop();
}
function drawMenu () { //building windows xp 7 background 
fill('blue')
rect(0, 790, 700, 100);// windows bar

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
  noStroke();
  fill("#115C37")
  circle(240, 250, 100); //left pupil outside
  circle(560, 202, 100); //right pupil outside
pop();


//draw pupils 
push();
fill("#000000ff")
  circle(560, 202, 50); //inside pupil right
fill("#000000ff")
  circle(240, 250, 50); //left inside pupil 
pop();


push();
fill("#50717a")
noStroke();
  arc(540, 200, 275, 110, 180, 360, CHORD); //right eyelids
  arc(240, 250, 235, 150, 180, 360, CHORD); //left eyelids
pop();

}
function drawEmoji(){ //emojis
textSize(25)
//text("🌸")
text("🌸", 100, 250) //flower
text("⬉✦", mouseX, mouseY) //cursor 2000s style

}
