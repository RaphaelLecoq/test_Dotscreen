class Disc {
    active;
    x;
    y;

    constructor(x, y) {
        this.active = false;
        this.x = x;
        this.y = y;
    }

    setActive() {
        this.active = true;
    }
}
