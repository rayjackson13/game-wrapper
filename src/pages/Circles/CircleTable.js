class CircleTable{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.r = 100;
		this.coins = [];
		this.points = [];
		this.createGrid();
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getR(){
		return this.r;
	}

	getLastCoin(){
		return this.coins[this.coins.length - 1];
	}

	getRandomPoint(){
		let index = randomInteger(0, this.points.length - 1);
		return this.points[index];
	}

	setGrid(grid){
		this.points = grid;
	}

	addCoin(coin){
		this.coins.push(coin);
		this.changeGrid();
		this.render();
	}

	createGrid(){
		this.points.push(new Coin(this.x, this.y, 2, "black"))
		for (let r = 1; r <= this.r - 25; r += 1.25){
			for(let angle = 0; angle < Math.PI * 2; angle += Math.PI/r){
				this.points.push(new Coin(this.x + Math.cos(angle) * r, this.y + Math.sin(angle) * r, 1, "black"));
			}
		} 
	}

	changeGrid(){
		let grid = [];
		let prev = this.points.length;
		let flag = true;
		for (let point of this.points){
			flag = true;
			for (let coin of this.coins){
				let bool = coin.isCollision(point);
				if(bool){
					flag = false;
					break;
				}
			}
			if (flag){
				grid.push(point);
			}
		}
		console.log(prev - grid.length);
		this.setGrid(grid);
		endCounter = grid.length;
	}

	printGrid(){
		for (let point of this.points){
			point.render();
		}
	}

	isOutOfBorder(x, y){
		const distance = dist(this.x, this.y, x, y);
		return distance <= this.r - COIN_DIAMETR/2;
	}

	checkCollision(x, y){
		for (let c of this.coins){
			const distance = dist(c.getX(), c.getY(), x, y);
			if (distance < c.getR() * 2){
				return true;
			}
		}
		return false;
	}

	drawCoins(){
		for (let coin of this.coins){
			coin.render();
		}
	}

	render(){
		fill(178);
		circle(this.x, this.y, this.r * 2);
		if (visible){
			this.printGrid();
		}
		this.drawCoins();
	}
}