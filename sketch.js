var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1image, car2image, car3image, car4image;
var trackImage, track;

var xvel, yvel;
var car1x,car1y;

var finishedPlayers = 0;
var pastFinished;
var goldImage, silverImage, bronzeImage;

function preload(){
  car1image = loadImage("images/car1.png");
  car2image = loadImage("images/car2.png");
  car3image = loadImage("images/car3.png");
  car4image = loadImage("images/car4.png");
  trackImage = loadImage("images/track.jpg");
  goldImage = loadImage("images/gold.png");
  silverImage = loadImage("images/silver.png");
  bronzeImage = loadImage("images/bronze.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  xvel = 0;
  yvel = 0;
}


function draw(){
  if(playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }
  if(finishedPlayers === 4){
    game.update(2);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2 && finishedPlayers === 4){
    game.displayRanks();
  }
}
