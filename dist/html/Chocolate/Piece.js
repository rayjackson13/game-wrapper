class Piece{
	constructor(startPosX, startPosY, width, height){
		this.startPosX = startPosX;		//Стартовые координаты дольки по oX
		this.startPosY = startPosY;		//Стартовые координаты дольки по oY
		this.width = width;				//Ширина дольки
		this.height = height;			//Длина дольки
	}
	
	draw(startChocolatePosX, startChocolatePosY){
		rect(this.startPosX + startChocolatePosX, this.startPosY + startChocolatePosY, this.width, this.height);
	}

	setStartPosX(startPosX){
		this.startPosX = startPosX;
	}

	setStartPosY(startPosY){
		this.startPosY = startPosY;
	}

	getStartPosX(){
		return this.startPosX;
	}
	
	getStartPosY(){
		return this.startPosY;
	}
}

