class FigureScreen extends Screen{
	constructor(name){
		super(name);
	}

	render(){
		background(102);
		fill(150);
		rect(width/3 - 50, height/2 - 50, 100, 100);
		fill(230);
		circle(width/3, height/2, 80);
		fill(150);
		rect(width/3 + 60, height/2 - 50, 100, 100);
		fill(230);
		rect(width/3 + 70, height/2 - 40, 80, 80);
		fill(150);
		rect(width/3 + 170, height/2 - 50, 100, 100);
		fill(230);
		triangle(width/3 + 180, height/2 + 40, width/3 + 220, height/2 - 40, width/3 + 260, height/2 + 40);
		frameRate(0);
	}
}