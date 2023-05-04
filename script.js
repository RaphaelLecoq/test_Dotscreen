class Game {
    canvas;
    context;
    discs;
    dimensions;
    currentColor;

    constructor() {
        this.currentColor = 'red';
        this.initDimensions();
        this.initDisc();
        this.initCanvas();
    }

    initDimensions() {
        this.dimensions = {width: 7, height: 6, discSize: 0, discSpacing: 0};
        this.dimensions.discSize = window.innerWidth * 0.35 / this.dimensions.width;
        this.dimensions.discSpacing = this.dimensions.discSize / 10;
        this.dimensions.discSize -= this.dimensions.discSpacing + this.dimensions.discSpacing / this.dimensions.width; 
    }

    initDisc() {
        this.discs = [];
        for (let y = 0; y < this.dimensions.height; y++) {
            this.discs.push([]);
            for (let x = 0; x < this.dimensions.width; x++) {
                const disc = new Disc(x, y);
                this.discs[y].push(disc);
            }
        }
    }

    initCanvas() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth * 0.35;
        this.canvas.height = this.dimensions.discSize * this.dimensions.height + this.dimensions.discSpacing * (this.dimensions.height + 1);
    }

    drawDisc(disc) {
        const discSize = this.dimensions.discSize;
        const discSpacing = this.dimensions.discSpacing;

        this.context.fillStyle = disc.color;
        this.context.beginPath();
        this.context.arc(disc.x * discSize + discSize / 2 + discSpacing * disc.x + discSpacing, disc.y * discSize + discSize / 2 + discSpacing * disc.y + discSpacing, discSize / 2, 0, 2 * Math.PI);
        this.context.fill();
    }

    render() {
        for (let y = 0; y < this.dimensions.height; y++) {
            for (let x = 0; x < this.dimensions.width; x++) {
                this.drawDisc(this.discs[y][x]);
            }
        }
    }

    getBottomDisc(x) {
        let disc = null;
        for (let y = this.dimensions.height - 1; y >= 0; y--) {
            disc = this.discs[y][x];
            if (disc.color == 'white')
                return disc;
        }
        return null;
    }

    addlistener() {
        this.canvas.onclick = (event) => {
            const x = Math.floor(event.offsetX / (this.dimensions.discSize + this.dimensions.discSpacing));
            const bottomDisc = this.getBottomDisc(x);
            console.log(bottomDisc);
            if (!bottomDisc)
                return;
            bottomDisc.color = this.currentColor;
            if (this.currentColor == 'red')
                this.currentColor = 'yellow';
            else 
                this.currentColor = 'red';
            this.render();
        }
    }

    reset() {
        this.initDisc();
        this.render();
    }
}

const game = new Game();
game.render();
game.addlistener();


const reset = document.getElementById('reset');
reset.onclick = () => game.reset();
