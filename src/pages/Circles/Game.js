let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

let screens = [];
let players = [];
let currentScreen;
let currentPlayer;
let playerIsComputer = false;
let table;
let visible = false;
let endCounter = 1;

const COIN_DIAMETR = 50;
const FPS = 60;

function changeScreen(number){
	currentScreen = screens[number];
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function isEndGame(){
      if (endCounter == 0){
        //currentScreen.render();
        alert("Game End" + "\n" + "win player:" + (currentPlayer.getNumber()));
        frameRate(0);
        location.reload();
      }
  }

function keyReleased() {
  if (key == 's') {
    visible = !visible; 
  }
}

function changePlayer(){
	currentPlayer = players[(currentPlayer.getNumber() + 1) % 2];
}

function setup(){
	createCanvas(width, height);
  	frameRate(FPS);
  	screens.push(new TypeGameScreen("type"));
  	screens.push(new FigureScreen("figure"));
  	screens.push(new GameScreen("game"));
  	//curentScreen = screens[0];
  	changeScreen(0);
}

function draw(){
	currentScreen.render();
  //isEndGame();
}