/*
 Greedy frog The saga 

 This is where variables,objects and the likes
 */







"use strict";
// Possible states so far : menu, variationMenu, game, pingpong, gameOver,etc
let gameState = "menu";

//start button
let startButton = {
    x: 190,
    y: 350,
    w: 280,
    h: 50,
    cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#192E18',
    label: "Click here to play Greedy Frog"
}
// more of button
let variationButton = {
    x: 220,
    y: 420,
    w: 200,
    h: 50,
    cornerRadius: 20,
    baseColor: '#FFD27F',
    hoverColor: '#FFE6B3',
    textColor: '#000',
    label: "More of greedy frog"
};

//Game Over messages for froggreedy regular
let gameOverMessages = [
    "Such a greedy frog you are,you just couldn't stop...",
    "My my my,your greediness got you killed eh?",
    "God lord think of all those larvae eggs you ate!",
    "Oh froggy,you are just the greediest.",

];
let isGameOver = false;

let currentGameOverMessage = "";

// mouse press state (so we only trigger once per click)
let wasMousePressed = false;

//score system
let score = 0;

//background and fading
let bgColor;
let targetColor;

//Perlin noise (future jeany remember to set them far apart so they arent the same)
let noiseOffsetX = 0;
let noiseOffsetY = 1000;

//music time
let titleMusic;
let gameMusic;

//let images of spidey BE
let spideytop;
let spideybottom;
let spideyleft;
let spideyright;
let upkey;
let movingkey;
//let gameMusic;

let keys = {
    up: false,
    down: false
};


// PingPong game variables

let pingBallImg;
let pingBallX, pingBallY;
let pingBallSpeedX = 5;
let pingBallSpeedY = 3;

let paddleLeftY = 200;
let paddleRightY = 200;
let paddleSpeed = 20;
let aiSpeed = 4; // adjust this number to make AI paddle player easier/harder


// Buttons inside variation menu aka more of greedy frog
let pingPongButton = {
    x: 220, y: 250, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Ping Pong Frog"
};

let backButton = {
    x: 220, y: 330, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#FFD27F',
    hoverColor: '#FFE6B3',
    textColor: '#000',
    label: "Back"
};


// Load all the images.
function preload() {
    spideytop = loadImage('./assets/images/SpiderTop.png');
    spideyleft = loadImage('./assets/images/SpiderLeft.png');
    spideyright = loadImage('./assets/images/SpiderRight.png');
    spideybottom = loadImage('./assets/images/SpiderBottomnDetail.png');
    upkey = loadImage('./assets/images/upkey.png')
    movingkey = loadImage('./assets/images/Movingkey.png')
    //ping pong asset
    pingBallImg = loadImage('./assets/images/frog.png');



    //music n sounds

    //gameMusic = loadSound('./assets/sounds/funkybeat.mp3');



}
// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    }
    ,
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
// Our fly Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, 
    size: 10,
    speed: 3
};