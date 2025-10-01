
/**
 * Pop up Jeany
 * By Jeany Corrius
 * Draw a self portrait
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";


let img; //image variable
let song;//music play 

//variable for x coordinate of cloud
let cloudFamily = 50;

//preload the image first
function preload(){
img=loadImage('./assets/retro.jpg');
}

function setup() {

  song = loadSound('./assets/erro.mp3');//error sound

  createCanvas(680, 825); // Creates a rectangular ish canvas
  angleMode(DEGREES); // Use degrees duh.
  background ('#C7C7C7'); //grey vintage background
  frameRate(100); //set frame rate 
  
}
function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}


function draw () {
  
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER); //variables
  //drawClouds();
  drawBase();
  drawEyes();
  drawLips();
  drawMouse();
  drawMenu();
  drawIcons();
  drawHair();

 

}

function drawHair(){
  fill("black")
arc(400,125,400,230,10,7);//hairline
}

function drawLips(){ //time to draw them lips
push ();  
noStroke();
fill("#8C0606")
  triangle(340,550,375,500,450,550); //top lips left
  triangle(520,520,400,560,460,490); //top lips right
pop();
push();
strokeWeight(2)
  fill("#912626")
  triangle(459,625,520,  520, 360, 550); //bottom lips 
 
  pop();
}


function drawMouse(){ //emojis and special characters 

text("⬉✦", mouseX, mouseY) //cursor 2000s styles
}

function drawMenu () { //building windows xp 7 bar 
push();
fill('blue');
rect(1, 790, 680, 100,5);// windows bar blue
pop();
push ();
fill ('green');
noStroke ();
rect(1,790,115,50,4,); //green bar short 
pop();
textSize(20) //setting size and adding emoji to bar
text("🔉",620,813)
text("⚠️",650,813)
text("🌍",590,813)
text("⚙️",560,813)
textSize(35)
text("⏻",10,820)
}

  
function drawBase() { //draw the foundation shape of face n neck n hair
  push();
fill("black")
noStroke();
rect(200,105,400,590,20);// big hair

pop();

push()
  rotate(-6) //Rotate the rectangle aka shoulders with neck and create it
  fill("#da8b45ff")
  noStroke();
  rect(90, 770, 540, 409); // shoulders
  rotate(-5); //Rotate the rectangle aka neck even more n create
  rect(305,560,119,300);//neck
pop();

//My face
 push();
fill("#d2843fff");
noStroke();
ellipse ( 410,300,410,540); //my round face
triangle (480,730,590,430, 235  ,450); //my chin
  //quad(20, 50, 80, 30, 80, 70, 20, 70);//potential chin
pop ();
}
function drawEyes(){//draw my eyes and pupils
push();
strokeWeight(2)
  fill("#F0E2A8")
  //  draw Outer eye shape
  ellipse(540, 200, 270, 100); //Blanc d.oeil right
  ellipse(240, 250, 230, 115); //left blanc d"oeil
pop();


push();
  noStroke();
  fill("#115C37")
  circle(240, 250, 100); //left pupil outside
  circle(560, 196, 100); //right pupil outside
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


function drawClouds(){ //clouds ohhhh
  push();
fill('#7BA8A3')
noStroke();
ellipse(cloudFamily, 250, 200, 100); //bottom cloud
ellipse(cloudFamily - 240, 130, 150, 50);//middle cloud
ellipse(cloudFamily + 10, 40,100, 40);//top cloud
//set x coordinate to framecount
cloudFamily = frameCount % width
pop();
}

function drawIcons () {
textSize(50)
text("📁",10,70)
text("📨",5,150)
text("📝",15,220)
text("🗑️",14,300)
}

