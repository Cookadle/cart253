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





//fully commented for pippin
"use strict";
// Possible states so far : menu, variationMenu, game, pingpong, gameOver,freeFrogClicker,etc
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
//let gameMusic;//damn i never used it eh
let keys = {
    up: false,
    down: false
};
///////////////////////// PingPong game variables
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

/////////////////////////for frogjump game variables
let jumpFrog = {
    x: 320,
    y: 440,
    size: 50,
    jumpHeight: 120,
    isJumping: false,
    jumpSpeed: 0,
    velocity: 0
};

let obstacles = [];
let jumpFrogScore = 0;
let frogImg;
let gameTimer = 30; //Set the game 4 30 seconds
let gameStartTime = 0;//Variable to track when the game started
let gameEnded = false; //to track if the game has ended
let jumpBg;
/////////////////////Freefrog clicker variables
let jailHealth = 100; //clicks needed
let maxJailHealth = 100;//drawing HP bar exist now ok
let frogShake = 0; //shake effect when clicked
let cageImg;
////// Buttons inside variation menu aka more of greedy frog
let pingPongButton = {//ping frog button
    x: 220, y: 250, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Ping Frog"
};//jumpfrog button 
let jumpFrogButton = {
    x: 220, y: 170, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Jump Frog"
};//backbutton
let backButton = {
    x: 220, y: 330, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#FFD27F',
    hoverColor: '#FFE6B3',
    textColor: '#000',
    label: "Back"
};//free frog button
let freeFrogButton = {
    x: 220, y: 100, w: 200, h: 50, cornerRadius: 20,
    baseColor: '#9ACC7E',
    hoverColor: '#B5E68C',
    textColor: '#000',
    label: "Free Frog"
};

///////////////////// Load all the images.
function preload() {
    spideytop = loadImage('./assets/images/SpiderTop.png');
    spideyleft = loadImage('./assets/images/SpiderLeft.png');
    spideyright = loadImage('./assets/images/SpiderRight.png');
    spideybottom = loadImage('./assets/images/SpiderBottomnDetail.png');
    upkey = loadImage('./assets/images/upkey.png')
    movingkey = loadImage('./assets/images/Movingkey.png')
    //ping pong asset
    pingBallImg = loadImage('./assets/images/frog.png');//the ball

    frogImg = loadImage('./assets/images/frog.png'); //the jumper
    //jump assets
    jumpBg = loadImage('./assets/images/jumpGrass.png');
    //jail clickler 
    cageImg = loadImage("./assets/images/jail.jpg");

    //music n sounds
    //gameMusic = loadSound('./assets/sounds/funkybeat.mp3');
}
////////////////////////////////////GREEDY FROG OG
///// Our frog
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