let gridSize;
const data = JSON.parse(localStorage.getItem('game'));
const redirectBack = () => {
    const index = window.location.href.indexOf('game.html');
    if (index === -1) {
        return;
    }
    window.location.href = window.location.href.slice(0, index);
};
if (!data) {
    redirectBack();
}
const { grid, players } = data;
const { width, height } = grid;
const { name: playerName } = players[0];
let cellList = [];

function preload() {
    localStorage.removeItem('game');
}

function setup() {
    gridSize = windowHeight;
    createCanvas(gridSize, gridSize);
}

function draw() {
    background(76);
    drawGrid(grid);
    noLoop();
}

function mouseClicked() {
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
    const { width, height, grid: plate } = grid;
    const cellWidth = (gridSize - 4) / max(width, height);
    fill(color(128, 128, 128));
    noStroke();
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = new Cell(j * cellWidth + 4, i * cellWidth + 4, cellWidth - 4, { y: i, x: j }, getColor(plate[i][j]));
            cell.draw();
            cellList.push(cell);
        }
    }
};

const getColor = item => {
    if (!item) {
        return color(128, 128, 128);
    }
    if (item === -1) {
        return color(220, 112, 112);
    }
    return color(89, 202, 139);
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
        if (result.status === 200) {
            const json = await result.json();
            const { grid: newGrid, full, winner } = json;
            grid.grid = newGrid;
            redraw();
            if (!full) {
                return;
            }
            if (full) {
                setTimeout(() => {
                    alert(winner === 'ai' ? 'Game over. Computer won!' : 'Game over. You won!');
                }, 0);
            }
        }
    } catch (e) {
        console.error(e.message);
    }
};