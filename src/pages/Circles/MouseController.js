function mouseReleased(){
	if (currentScreen.getName() == "type"){
		button1();
		button2();
	} else if (currentScreen.getName() == "figure"){
		button3();
	} else if(currentScreen.getName() == "game"){
		if (table.isOutOfBorder(mouseX, mouseY) && !table.checkCollision(mouseX, mouseY)){
			currentPlayer.turn(table);
			isEndGame();
			changePlayer();
			if (currentPlayer.getNumber() == 1 && playerIsComputer == true){
				currentPlayer.turn(table);
				isEndGame();
				changePlayer();
			}
		}
	}
}

function button1(){
	if (mouseX > width/2 - 60 && mouseX < width/2 + 25 && mouseY > height/3 - 30 && mouseY < height/3 + 10){
		screens[2].setPlayer1(new Player(0, "green"));
		screens[2].setPlayer2(new Player(1, "blue"));
		players.push(new Player(0, "green"));
		players.push(new Player(1, "blue"));
		currentPlayer = players[randomInteger(0, 1)];
		changeScreen(1);
		frameRate(FPS);
	}
}

function button2(){
	if (mouseX > width/2 - 60 && mouseX < width/2 + 25 && mouseY > height/3 + 20 && mouseY < height/3 + 60){
		screens[2].setPlayer1(new Player(0, "green"));
		screens[2].setPlayer2(new Computer(1, "blue"));
		players.push(new Player(0, "green"));
		players.push(new Computer(1, "blue"));
		currentPlayer = players[randomInteger(0, 1)];
		playerIsComputer = true;
		changeScreen(1);
		frameRate(FPS);
	}
}

function button3(){
	if (mouseX > width/3 - 50 && mouseX < width/3 + 50 && mouseY > height/2 - 50 && mouseY < height/2 + 50){
		table = new CircleTable(width/2, height/2)
		changeScreen(2);
		currentScreen.setTable(table);
		console.log("circle");
		//frameRate();
	}
}

