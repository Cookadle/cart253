/**
 * Terrible New Car
 * Jeany Corrius
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data and language data
 */
function preload() {
    carData = loadJSON("assets/data/cars.json");
    dinosaurData = loadJSON("assets/data/dinosaurs.json");
    langData = loadJSON("assets/data/lang.json");
}



//Create the canvas
function setup() {
    createCanvas(600, 400);
    // Set the text language
    carName = langData.instructions[lang];

}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background("#2391C2");

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(29);
    text(carName, width / 2, height / 2);
    pop();
}

//Generate a new car name
function mousePressed() {
    // pick a random car manufacturer from the car date file
    let randomCar = random(carData.cars);

    // pick a random dinosaur from the dinosaur data file
    let randomDino = random(dinosaurData.dinosaurs);

    // combining them and added emoji for fun
    carName = "🏎️ " + randomCar + " " + randomDino + " 🦕";
}
