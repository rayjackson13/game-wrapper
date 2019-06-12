class Computer extends Player{
	constructor(name, color){
		super(name, color);
	}

	firstTurn(table){
		table.addCoin(new Coin(table.getX(), table.getY(), COIN_DIAMETR, this.color))
	}

	turn(table){
		if (table.coins.length == 0){
			this.firstTurn(table);
		} else {
			let point = table.getLastCoin();
			let x = point.getX();
			let y = point.getY();
			x -= table.getX();
			y -= table.getY();
			x = -x;
			y = -y;
			x += table.getX();
			y += table.getY();
			let bool = table.checkCollision(x, y);
			if (!bool){
				table.addCoin(new Coin(x,y, COIN_DIAMETR, this.color));
			} else {
				let point = table.getRandomPoint();
				let coin = new Coin(point.getX(), point.getY(), COIN_DIAMETR, this.color);
				table.addCoin(coin);
			}
		}
	}
}