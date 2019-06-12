let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

let numberOfColumns = 0;
let numberOfLines = 0;
let flagStart = true;
let chocolates;
let currentChocolate;
let chocolateNumber = 0;
let isPlayerFirst = 0;
let gameOver = false;
let currentPlayer;
let winMessage;
let restart;

const pieceWidth = 30;
const pieceHeight = 50;
const step = 30;




function create2DArray(columns, lines) {
    let arr = [];
    for (let i = 0; i < columns; i++) {
        arr[i] = [];
        for (let j = 0; j < lines; j++) {
            arr[i][j] = 0;
        }
    }
    return (arr);
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function createChocolate(startPosX, startPosY, numberOfColumns, numberOfLines) {
    let chocolateColor = color(168, 84, 24);
    fill(chocolateColor);
    let pieces = create2DArray(numberOfColumns, numberOfLines);
    let chocolate = new Chocolate(startPosX, startPosY, numberOfColumns, numberOfLines, pieces, chocolateNumber);
    for (let i = 0; i < numberOfColumns; i++) {
        for (let j = 0; j < numberOfLines; j++) {
            let piece = new Piece(i * pieceWidth, j * pieceHeight, pieceWidth, pieceHeight);
            chocolate.addPiece(piece, i, j);
        }
    }
    chocolateNumber++;
    return chocolate;
}

function checkCollision(currentX, currentY) {            //Проверка, на какую шоколадку нажали
    for (let chocolate of chocolates) {
        if (currentX > chocolate.startPosX &&
            currentX < chocolate.startPosX + chocolate.numberOfColumns * pieceWidth &&
            currentY > chocolate.startPosY &&
            currentY < chocolate.startPosY + chocolate.numberOfLines * pieceHeight) {
            return chocolate;
        }
    }
}

function subX(currentX) {                       //Деление шоколадки по вертикали
    let prevNumberOfColumns = (currentX - currentChocolate.startPosX) / pieceWidth;
    prevNumberOfColumns = Math.round(prevNumberOfColumns);
    let arr = currentChocolate.getArray();
    let arrPrev = create2DArray(prevNumberOfColumns, currentChocolate.numberOfLines);
    let arrNext = create2DArray(currentChocolate.numberOfColumns - prevNumberOfColumns, currentChocolate.numberOfLines);
    for (let i = 0; i < prevNumberOfColumns; i++) {
        for (let j = 0; j < currentChocolate.numberOfLines; j++) {
            arrPrev[i][j] = arr[i][j];
        }
    }
    for (let i = 0; i < currentChocolate.numberOfColumns - prevNumberOfColumns; i++) {
        for (let j = 0; j < currentChocolate.numberOfLines; j++) {
            arrNext[i][j] = arr[i + prevNumberOfColumns][j];
            arrNext[i][j].setStartPosX(i * pieceWidth);
            arrNext[i][j].setStartPosY(j * pieceHeight);

        }
    }
    currentChocolate.setArray(arrPrev);
    let chocolate = new Chocolate(currentChocolate.startPosX + prevNumberOfColumns * pieceWidth + step * prevNumberOfColumns,
        currentChocolate.startPosY, currentChocolate.numberOfColumns - prevNumberOfColumns,
        currentChocolate.numberOfLines, arrNext, chocolateNumber);
    currentChocolate.setNumberOfColums(prevNumberOfColumns);
    chocolateNumber++;
    return chocolate;
}

function subY(currentY) {                       //Деление шоколадки по горизонтали
    let prevNumberOfLines = (currentY - currentChocolate.startPosY) / pieceHeight;
    prevNumberOfLines = Math.round(prevNumberOfLines);
    let arr = currentChocolate.getArray();
    let arrPrev = create2DArray(currentChocolate.numberOfColumns, prevNumberOfLines);
    let arrNext = create2DArray(currentChocolate.numberOfColumns, currentChocolate.numberOfLines - prevNumberOfLines);
    for (let i = 0; i < currentChocolate.numberOfColumns; i++) {
        for (let j = 0; j < prevNumberOfLines; j++) {
            arrPrev[i][j] = arr[i][j];
        }
    }
    for (let i = 0; i < currentChocolate.numberOfColumns; i++) {
        for (let j = 0; j < currentChocolate.numberOfLines - prevNumberOfLines; j++) {
            arrNext[i][j] = arr[i][j + prevNumberOfLines];
            arrNext[i][j].setStartPosX(i * pieceWidth);
            arrNext[i][j].setStartPosY(j * pieceHeight);

        }
    }
    currentChocolate.setArray(arrPrev);
    let chocolate = new Chocolate(currentChocolate.startPosX,
        currentChocolate.startPosY + prevNumberOfLines * pieceHeight + step * prevNumberOfLines,
        currentChocolate.numberOfColumns, currentChocolate.numberOfLines - prevNumberOfLines, arrNext, chocolateNumber);
    currentChocolate.setNumberOfLines(prevNumberOfLines);
    chocolateNumber++;
    return chocolate;
}

function mousePressed() {
    currentChocolate = checkCollision(mouseX, mouseY);
    if (!currentChocolate) {
        return;
    }
    if (currentChocolate.getNumberOfColums() === 1 && currentChocolate.getNumberOfLines() === 1) return;
    playerTurn(mouseX, mouseY);
}

function playerTurn(currentX, currentY) {
    if (isEndGame()) return;
    let ostX = ((currentX - currentChocolate.startPosX) / pieceWidth) % 1 * 100;     //Расстояние клика до линии разлома по X
    let ostY = ((currentY - currentChocolate.startPosY) / pieceHeight) % 1 * 100;    //Расстояние клика до линии разлома по Y
    if (ostX >= 20 && ostX <= 80 && ostY >= 20 && ostY <= 80) return;				 //Проверка расстояния до линий разлома
    if (Math.abs(50 - ostX) > Math.abs(50 - ostY)) {
        if ((currentX - currentChocolate.startPosX < pieceWidth - 20) ||
            (currentX > currentChocolate.startPosX + currentChocolate.numberOfColumns * pieceWidth - 20)) return;
        let newChoco = subX(currentX);
        chocolates.push(newChoco);
        currentPlayer = "Human";
        redraw();
        compTurn();
    } else {
        if ((currentY - currentChocolate.startPosY < pieceHeight - 20) ||
            (currentY > currentChocolate.startPosY + currentChocolate.numberOfLines * pieceHeight - 20)) return;
        let newChoco = subY(currentY);
        chocolates.push(newChoco);
        currentPlayer = "Human";
        redraw();
        compTurn();
    }
}

function drawChocolates() {
    for (let chocolate of chocolates) {
        chocolate.drawChocolate();
    }
}

function compTurn() {
    if (isEndGame()) return;
    let isHorisontal = true;
    let chosenChocolate = chocolates[Math.floor(Math.random() * chocolates.length)];
    while (chosenChocolate.getNumberOfColums() === 1 && chosenChocolate.getNumberOfLines() === 1) {
        chosenChocolate = chocolates[Math.floor(Math.random() * chocolates.length)];
    }
    if (chosenChocolate.getNumberOfColums() === 1) {
        isHorisontal = true;
    } else if (chosenChocolate.getNumberOfLines() === 1){
        isHorisontal = false;
    }
    else isHorisontal = Math.random() >= 0.5;
    if (isHorisontal) {
        let cutNumber = 1 + Math.floor(Math.random() * (chosenChocolate.getNumberOfLines() - 1));
        let cutPosition = chosenChocolate.startPosY + cutNumber * pieceHeight;
        currentChocolate = chosenChocolate;
        chocolates.push(subY(cutPosition));
    } else {
        let cutNumber = 1 + Math.floor(Math.random() * (chosenChocolate.getNumberOfColums() - 1));
        let cutPosition = chosenChocolate.startPosX + cutNumber * pieceWidth;
        currentChocolate = chosenChocolate;
        chocolates.push(subX(cutPosition));
    }
    currentPlayer = "Computer";
    setTimeout('redraw()', randomInteger(100, 800));
}

function setup() {
    alert('Правила игры:\nИгроки по-очереди ломают шоколадку вдоль линии разлома. Победит тот, кто отломит последнюю дольку.');
    noLoop();
    createCanvas(width, height);
    background(75);
    while (!(numberOfColumns >= 1 && numberOfColumns <= 10)){
        numberOfColumns = parseInt(prompt('Введите ширину шоколадки в дольках', '5'));
    }
    while (!(numberOfLines >= 1 && numberOfLines <= 10)){
        numberOfLines = parseInt(prompt('Введите длину шоколадки в дольках', '7'));
    }
    while (!(isPlayerFirst === 1 || isPlayerFirst === 2)){
        isPlayerFirst = parseInt(prompt('Каким по счёту вы будете ходить? (1,2)', '1'));
    }
}

function isEndGame() {
    return chocolates.length === numberOfColumns * numberOfLines;
}

function draw() {
    if (flagStart) {
        stroke(65, 25, 0);
        strokeWeight(3);
        let firstChoco = createChocolate(30, 30, numberOfColumns, numberOfLines);
        chocolates = [];
        chocolates.push(firstChoco);
        if (isPlayerFirst === 2) compTurn();
        flagStart = false;
    }
    background(75);
    drawChocolates();
    if (isEndGame()) {
        if (currentPlayer === "Computer") winMessage = "проиграли.";
        else winMessage = "победили!";
        setTimeout('alert("Ходов больше нет...Игра окончена! Вы " + winMessage)' , 1500);
        setTimeout('location.reload()', 1500);
    }
}

