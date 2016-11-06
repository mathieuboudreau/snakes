var player;
var PSIZE = 20;
var SPEED = 1;

function setup() {
    createCanvas(500, 500);
    player = new Snake();
    frameRate(10);
}

function draw() {
    background(200);
    player.update();
    player.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        player.dir(0, -SPEED);
    } else if (keyCode === DOWN_ARROW) {
        player.dir(0, +SPEED);
    } else if (keyCode === LEFT_ARROW) {
        player.dir(-SPEED, 0);
    } else if (keyCode === RIGHT_ARROW) {
        player.dir(SPEED, 0);
    }
}

function Snake() {
    this.x = width/2;
    this.y = height/2;

    this.dir = function(vx, vy) {
        this.xSpeed = vx;
        this.ySpeed = vy;
    }

    // Initial movement direction
    this.dir(SPEED,0)

    this.update = function() {
        this.x = this.x + this.xSpeed*PSIZE;
        this.y = this.y + this.ySpeed*PSIZE;

        this.x = constrain(this.x, 0, width-PSIZE);
        this.y = constrain(this.y, 0, height-PSIZE);
    }

    this.show = function() {
        fill(0);
        rect(this.x, this.y, PSIZE, PSIZE);
    }
}
