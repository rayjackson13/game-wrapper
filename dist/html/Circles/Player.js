class Player{
	constructor(number, color){
		this.number = number;
		this.color = color;
	}

	getNumber(){
		return this.number;
	}

	turn(table){
		table.addCoin(new Coin(mouseX, mouseY, 50, this.color));
	}

	printCursor(){
		if (table.isOutOfBorder(mouseX, mouseY) && !table.checkCollision(mouseX, mouseY)){
			fill(this.color);
			
		} else {
			fill("red");
		}
		circle(mouseX, mouseY, COIN_DIAMETR);
	}
}