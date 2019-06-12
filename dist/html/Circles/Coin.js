class Coin{
	constructor(x, y, d, color){
		this.x = x;
		this.y = y;
		this.r = d/2;
		this.color = color;
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

	isCollision(point){
		const distance = dist(this.x, this.y, point.getX(), point.getY());
		return distance <= this.r * 2;
	}

	render(){
		fill(this.color);
		circle(this.x, this.y, this.r * 2);
	}

}