var player;
var PSIZE = 10;

function setup() {
    createCanvas(500, 500);
    player = new Snake();
}

function draw() {
    background(200);
    player.update();
    player.show();
}

function Snake() {
    this.x = width/2;
    this.y = height/2;

    this.update = function() {
    }

    this.show = function() {
        fill(0);
        rect(this.x, this.y, PSIZE, PSIZE);
    }
}
