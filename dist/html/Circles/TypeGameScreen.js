class TypeGameScreen extends Screen{
	constructor(name){
		super(name);
	}

	render(){
		background(102);
		textSize(32);
		fill(178);
		rect(width/2 - 60, height/3 - 30, 85, 40);
		fill(0);
		text("1 - 1", width/2 - 50, height/3);
		fill(178);
		rect(width/2 - 60, height/3 + 20, 85, 40);
		fill(0);
		text("P - C", width/2 - 55, height/3 + 50);
		frameRate(0);
	}
}