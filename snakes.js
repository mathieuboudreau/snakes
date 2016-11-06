var player;
var food;

var PSIZE = 20;
var GRIDX = 500;
var GRIDY = 500;
var SPEED = 1;

function setup() {
    createCanvas(floor(GRIDX/PSIZE)*PSIZE, floor(GRIDY/PSIZE)*PSIZE);
    player = new Snake();
    food = new Food();
    food.pickLocation();

    frameRate(10);
}

function draw() {
    background(200);
    player.update();
    player.eat();
    player.show();

    food.show();
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

    this.eat = function() {
        if (dist(this.x, this.y, food.x, food.y) < 1) {
            food.pickLocation();
        }

    }

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

function Food() {

    this.pickLocation = function() {
        var cols = floor(width/PSIZE);
        var rows = floor(height/PSIZE);

        this.x = floor(random(cols))*PSIZE;
        this.y = floor(random(rows))*PSIZE;
    }

    this.show = function() {
        fill(51, 147, 232);
        noStroke()
        rect(this.x, this.y, PSIZE, PSIZE);
    }
}
