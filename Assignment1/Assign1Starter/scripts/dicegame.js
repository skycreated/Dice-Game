
/*
 Filename:    dicegame.js
 Author:      Skylar Magouliotis
 Date:        2026-02-06 (due on January 20)
 Purpose:     Assignment #1
 */

"use strict";

// CONSTANTS
/** Number of sides of the die to be rolled  @type {number}  */
const DIE_SIDES = 6;
/** Number of rolls of the die to make  @type {number}  */
const NUM_ROLLS = 6;
const IMAGES = ["../images/dice1.png", "../images/dice2.png", "../images/dice3.png", "../images/dice4.png", "../images/dice5.png", "../images/dice6.png"];

/**
 * Generate a random integer between 1 and a supplied value (inclusive).
 *
 * @param max           the largest random integer that can be created
 * @returns {number}    a random integer
 * type {clickCount} contains the number of times the thing is clicked (I didn't use this I was just practicing)
 */

// GLOBAL VARIABLES
let points = 0;
let totalPoints = 0;

let index = 0;
let timerID = null;

let countone = 0;
let counttwo = 0;
let countthree = 0;
let countfour = 0;
let countfive = 0;
let countsix = 0;

let rolllist = [];
let displayList = [];

let roundCounter = 0;

let win = false;
let totalWins = 0;
let totalLosses = 0;



//WHEN THE WINDOW LOADS
window.onload = function () {
    document.querySelectorAll("img").forEach((img) => {img.addEventListener("click", startIt);});
    document.getElementById("btnRestart").addEventListener("click",restartProgram);
    window.alert("Heyyyyy, it's sky. This is the amazing dice game!!! Good luck :)")
}

//FLIPS THROUGH THE IMAGES SO IT LOOKS LIKE DICE ARE ROLLING
function showImage(){
    document.getElementById("image1").src = IMAGES[rolllist[0]];
    document.getElementById("image2").src = IMAGES[rolllist[1]];
    document.getElementById("image3").src = IMAGES[rolllist[2]];
    document.getElementById("image4").src = IMAGES[rolllist[3]];
    document.getElementById("image5").src = IMAGES[rolllist[4]];
    document.getElementById("image6").src = IMAGES[rolllist[5]];
}

//GOES THROUGH TO GET A RANDOM NUMBER FOR THE DIE
function nextImage(){
    for(let i = 0; i < NUM_ROLLS; i++) {
        index = getRandomInt(DIE_SIDES);
        rolllist[i] = index;
    }
    showImage();
}

//STARTS THE ROLL
function startIt(){
    if (timerID !== null) return; //start the roll if the timer is not null
    timerID = setInterval(nextImage, 100); //changes every 100ms
    //disabled the images so that the user can't keep clicking (idk if its this line of code that is preventing that or if it's the way I set up my timers)
    document.querySelectorAll("img").forEach((img) => {img.disabled = true;});
    setTimeout(stopIt, 1000); //we want it to stop after 1 second

}

//STOPS THE ROLL
function stopIt(){
    roundCounter++; //counts what round (roll) we are on
    clearInterval(timerID); //clears the timer interval so that it can reset
    timerID = null; //timer is null here so that the roll can't restart
    //enabled the images so that the user can click again (idk if its this line of code that is allowing that or if it's the way I set up my timers)
    document.querySelectorAll("img").forEach((img) => {img.disabled = false;});

    for (let i = 0; i < NUM_ROLLS; i++) {
        rolllist[i] = (rolllist[i]+1); //I had to add 1 because it was going from 0-5 instead of 1-6

        //Checks to see what each die has rolled so we can establish points
        if (rolllist[i] === 1){
            countone++;
        } else if (rolllist[i] === 2 ){
            counttwo++;
        } else if (rolllist[i]=== 3 ){
            countthree++;
        } else if (rolllist[i] === 4 ){
            countfour++;
        }else if (rolllist[i]=== 5){
            countfive++;
        }else if (rolllist[i] === 6){
            countsix++;
        }

    }
    display();
}


//TO GET RANDOM DICE ROLL
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//DISPLAY ELEMENTS
function display(){
    document.getElementById("pRolled").innerHTML = "You Rolled: " + rolllist;
    document.getElementById("hScore").innerHTML = "Overall Score: " + totalPoints;

    //this displays the array most recent first
    //this was extremely difficult for me to figure out..... but I got it!!!!!
    //I was doing innerhtml but that was printing it in order - so when you do the adjacent one and after begin it will add it as the first row instead
    //many hours for two lines of code (brb crying)
    displayList.unshift(rolllist); //I tried the unshift thing here because it adds it to the beginning of the array but I still had issues
    document.getElementById("tblRolls").insertAdjacentHTML("afterbegin", `<tr>${rolllist}</tr>`);

    pointSystem();
}


//POINT SYSTEM
function pointSystem() {

    //ONE1
    if (countone <= 2) {
        points = points + countone * 100;
    } else if (countone === 3) {
        points = points + 1000;
    } else if (countone === 6) {
        win = true; //if the player rolls all ones they automatically win
    } else if (countone >= 4) {
        points = points + 1000 + ((countone - 3) * 100);
    }
    //TWO2
    if (counttwo >= 3) {
        points = points + 200;
    }
    //THREE3
    if (countthree >= 3) {
        points = points + 300;
    }
    //FOUR4
    if (countfour >= 3) {
        points = points + 400;
    }
    //FIVE5
    if (countfive <= 2) {
        points = points + countfive * 50;
    } else if (countfive === 3) {
        points = points + 500;
    } else if (countfive >= 4 && countfive < 6) {
        points = points + 500 + ((countfive - 3) * 50);
    } else if (countfive === 6) {
        points = points + 1000;
    }
    //SIX6
    if (countsix >= 3) {
        points = points + 600;
    }

    //reset the variables
    countone = 0;
    counttwo = 0;
    countthree = 0;
    countfour = 0;
    countfive = 0;
    countsix = 0;

    //add the points to the total
    totalPoints = totalPoints + points;
    //display points
    document.getElementById("pRollScore").innerHTML = "Your score for this round is: " + points;
    //reset the points variable for the next roll
    points = 0;

    //first case checks if there was an autowin
    if (win ===true){
        totalPoints = 5000;
        winner();
    }else if (totalPoints === 5000){ //this checks if the player won by getting exactly 5000 points
        win = true;
        winner();
        document.getElementById("hScore").innerHTML += `<h2>${"YOU are a WINNER!!! YAY YAY YAY "}</h2>`;
    } else if (totalPoints > 5000){ //this checks if the player lost by exceeding 5000 points
        win = false;
        winner();
        document.getElementById("hScore").innerHTML += `<h2>${"You need EXACTLY 5000 points to win. SORRY :("}</h2>`;
    }
}



//FOR IF THE PLAYER WINS OR LOSES
function winner(){
    document.getElementById("btnRestart").classList.remove("hidden"); //make button visible
    document.getElementById("btnRestart").style.backgroundColor = "yellow";

    //document.querySelectorAll("img").forEach((img) => {img.classList.add("hidden");});
    //I couldn't figure this out at first (I was trying to just disable/enable the image) but you have to disable/enable the event listener instead
    document.querySelectorAll("img").forEach((img) => {img.removeEventListener("click", startIt);});

    //as per described:
    //step f.	Add the number of rolls required at the end of the game to roundListHeader.
    //why at the end? I wanted to update it after each click :p
    document.getElementById("roundListHeader").innerHTML = "List of rounds: " + roundCounter;

    if (win === true) { //if the player wins
        document.querySelector("body").style.backgroundColor = "lime";
        totalWins++;
    }else if (win === false){ //if the player doesn't win
        document.querySelector("body").style.backgroundColor = "red";
        document.getElementById("hScore").style.color = "white";
        totalLosses++;
    }

    document.querySelector("div").innerHTML = "Wins: " + totalWins + " Losses: " + totalLosses; //displays your wins and losses
    document.querySelector("div").style.backgroundColor = "yellow"; //highlights your wins and losses
}


//RESTART THE PROGRAM (RESET EVERYTHING)
function restartProgram(){
    //is there an easier way to do this? :o

    //reset display elements
    document.getElementById("btnRestart").classList.add("hidden"); //hide button

    document.querySelector("body").style.backgroundColor = "pink"; //pink is a better background color :p
    document.getElementById("hScore").style.color = "red";
    document.querySelector("div").style.backgroundColor = "";

    document.getElementById("pRolled").innerHTML = "";
    document.getElementById("roundListHeader").innerHTML = "List of rounds: ";
    document.getElementById("tblRolls").innerHTML = "";
    document.getElementById("hScore").innerHTML = "Overall Score: 0";
    document.getElementById("pRollScore").innerHTML = "";

    //document.querySelectorAll("img").forEach((img) => {img.classList.remove("hidden");});
    //I couldn't figure this out at first (I was trying to just disable/enable the image) but you have to disable/enable the event listener instead
    document.querySelectorAll("img").forEach((img) => {img.addEventListener("click", startIt);});

    //reset variables
    points = 0;
    totalPoints = 0;
    index = 0;
    timerID = null;
    countone = 0;
    counttwo = 0;
    countthree = 0;
    countfour = 0;
    countfive = 0;
    countsix = 0;
    rolllist = [];
    win = false;
    roundCounter = 0;
}


//I wanted to add a div to display the total number of wins and losses
//It was challenging to figure out how to do this without manipulating the original CSS and HTML files
const newthing = document.createElement("div");
newthing.textContent = "Wins: " + totalWins + " Losses: " + totalLosses;
document.querySelector("section").appendChild(newthing);


