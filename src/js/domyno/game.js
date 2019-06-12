let gridSize;
const data = JSON.parse(localStorage.getItem('game'));
const { grid, players } = data;
const { width, height } = grid;
const { name: playerName } = players[0];
let cellList = [];

function setup() {
    gridSize = windowHeight;
    createCanvas(gridSize, gridSize);
}

function draw() {
    background(76);
    drawGrid(grid);
    // noLoop()
}

function mouseClicked() {
    console.log('i\'m clicked', keyIsPressed && key);
    let corCell;
    let vertical = false;
    for (let cell of cellList) {
        const checking = cell.checkCorrelation(mouseX, mouseY);
        if (checking) {
            corCell = cell;
            break;
        }
    }

    if (!corCell) {
        return;
    }

    if (keyIsPressed && key === 'Shift') {
        vertical = true;
    }

    placeDomino(corCell.position, vertical);
}

const drawGrid = grid => {
    const { width, height } = grid;
    const cellWidth = (gridSize - 4) / max(width, height);
    fill(color(128, 128, 128));
    noStroke();
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = new Cell(j * cellWidth + 4, i * cellWidth + 4, cellWidth - 4, { y: i, x: j });
            cell.draw();
            cellList.push(cell);
        }
    }
};

const placeDomino = async (position, vertical) => {
    try {
        const result = await fetch('http://localhost:1700/game/domino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position,
                vertical
            })
        });
        const json = await result.json();
        console.log(json);
    } catch (e) {
        console.error(e.message);
    }
};