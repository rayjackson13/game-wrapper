class Chocolate{
	constructor(startPosX, startPosY, numberOfColumns, numberOfLines, arrayOfPieces, chocolateNumber){
		this.startPosX = startPosX;					//Стартовые координаты шоколадки по oX
		this.startPosY = startPosY;					//Стартовые координаты шоколадки по oY
		this.numberOfColumns = numberOfColumns;		//Число столбцов
		this.numberOfLines = numberOfLines;			//Число строк
		this.arrayOfPieces = arrayOfPieces;			//Массив долек
		this.chocolateNumber = chocolateNumber;		//Порядковый номер шоколадки
	}
	
	getChocolateNumber(){
		return this.chocolateNumber;
	}
	
	getArray(){
		return this.arrayOfPieces;
	}
	
	setArray(arr){
		this.arrayOfPieces = arr;
	}
	
	setNumberOfColums(numberOfColums){
		this.numberOfColumns = numberOfColums;
	}
	
	setNumberOfLines(numberOfLines){
		this.numberOfLines = numberOfLines;
	}

	getNumberOfColums(){
		return this.numberOfColumns;
	}

	getNumberOfLines(){
		return this.numberOfLines;
	}

	addPiece(piece, i, j){
		this.arrayOfPieces[i][j] = piece;
	}
	
	drawChocolate(){
		for (let i = 0; i < this.numberOfColumns; i++){
			for(let j = 0; j < this.numberOfLines; j++){
				this.arrayOfPieces[i][j].draw(this.startPosX, this.startPosY);
			}
		}
	}
}
