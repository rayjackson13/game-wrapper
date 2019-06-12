class GameScreen extends Screen{
	constructor(name){
		super(name);
	}

	setTable(table){
		this.table = table;
		frameRate(FPS);
	}

	setPlayer1(player){
		this.player1 = player;
	}

	setPlayer2(player){
		this.player2 = player;
	}

	isEndGame(){
  		if (table.points.length == 0){
    		alert("Game End" + "\n" + "win player:" + currentPlayer.getNumber());
    		frameRate(0);
    		location.reload();
  		}
	}

	menu(){
		textSize(32);
		fill(0);
		text("Ходит игрок № " + currentPlayer.getNumber(), 30, 30)
		text("Возможные положения: " + table.points.length, 500, 30);
	}

	render(){
		if (currentPlayer.getNumber() == 1 && playerIsComputer == true){
			this.player2.turn(this.table);
			//isEndGame();
			changePlayer();
		}
		background(102);
		this.menu();
		this.table.render();
		currentPlayer.printCursor();
		//this.isEndGame();
	}
	
}