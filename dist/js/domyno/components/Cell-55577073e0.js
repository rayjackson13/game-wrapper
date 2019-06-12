class Cell {
    constructor(x, y, size, position, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.position = position;
        this._color = color;
    }

    draw() {
        const { x, y, size, _color } = this;
        fill(_color);
        rect(x, y, size, size, 10);
    }

    get getPosition() {
        return this.position;
    }

    checkCorrelation(x, y) {
        if (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size) {
            return true;
        }
        return false;
    }
}