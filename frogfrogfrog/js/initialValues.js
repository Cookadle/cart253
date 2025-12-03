/*
/**
 * Frogfrogfrog :The Saga
 * 
 * Game directory-
 * script.js                -setup,functions,draw,key controls ,menu CONTROLS/IMPLEMENTATIONS,
 * initialValues.js         -values,variables,array,objects etc
 * backgroundRender.js      -scenary such as the background,score,BUTTONS and ill see what else
 * characterRender.js       -frongs , paddle and fly are in there mostly drawing of the object followed with their moving mecanisms like move tongue
 * p5.min.js                - p5 main library
 * p5.sound.min.js          - p5 sound library
 * index.html               - html file
 * images folder            -all images asre stored here
 * sounds folder            -all sound effects or music will be kept here
 * 
 *  A multigame of catching flies in original ways
 * 1.frog cath
 * 2.pingfrog.
 
 * Original concept by : Pippin Bar
 * Modded by : Jeany Corrius 
 * 
 * Instructions for Greedy Frog:
 * - Move the frog with the left right key arrows
 * - Press up arrow to launch the tongue
 * - Catch flies until you can't
 * 
 * Instructions for Ping Pong Frog :
 * -Move the paddle with the up and down key arrows
 * -Catch the flies
 * 
 * Made with p5
 * https://p5js.org/
 * 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 *This is where variables,objects and the likes are stored
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
// more of greedy frog button
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

let aiSpeed = 4; // adjustnumber to make AI paddle player easier/harder at start

let leftScore = 0;//score for ai 
let rightScore = 0;//SCORE for player


// Ping Pong fly
let pingFlyX = 0;
let pingFlyY = 0;
let pingFlySize = 30;
//crawling spider return for ping pong
let spiders = [];
let spiderCount = 5;


// Add new variable for custom message for ping frog
let pingPongGameOverMessage = "Oooof they ate you up Mr.Greedy!";

//for frogsnake game
let flyFruit = {}; 
let frogHead; 
let frogDirection = { x: 0, y: 0 }; // initial movement direction (no movement at start)
let frogSize = 20; 
let frogSpeed = 10; 
let snakeFrogScore = 0; 
let frogImg;  
let flyImg;

// Buttons inside variation menu aka more of greedy frog
let pingPongButton = {
    x: 220, y: 250, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Ping Frog"
};
let snakeFrogButton = {
    x: 220, y: 170, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Snake Frog"
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
//snake frog
    frogImg = loadImage('./assets/images/frog.png'); 
    flyImg = loadImage('./assets/images/fly.png'); 


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