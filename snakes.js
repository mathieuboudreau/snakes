var player;
var PSIZE = 20;
var SPEED = 1;

var food;

function setup() {
    createCanvas(500, 500);
    player = new Snake();
    frameRate(10);

    pickLocation();
}

function draw() {
    background(200);
    player.update();
    player.show();

    fill(51, 147, 232);
    noStroke()
    rect(food.x, food.y, PSIZE, PSIZE);
}

function pickLocation() {
    var cols = floor(width/PSIZE);
    var rows = floor(height/PSIZE);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(PSIZE);
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
    this.x = floor(floor(width/PSIZE)/2)*PSIZE;  // Put user initial pos on same grid as defined for food
    this.y = floor(floor(height/PSIZE)/2)*PSIZE; // ...it's the closest grid position near center

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
