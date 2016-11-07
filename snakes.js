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
    player.die();
    player.eat();
    player.update();
    food.show();
    player.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (player.ySpeed !== SPEED){
            player.dir(0, -SPEED);
        }
    } else if (keyCode === DOWN_ARROW) {
        if (player.ySpeed !== -SPEED){
            player.dir(0, +SPEED);
        }
    } else if (keyCode === LEFT_ARROW) {
        if (player.xSpeed !== SPEED){
            player.dir(-SPEED, 0);
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (player.xSpeed !== -SPEED){
            player.dir(SPEED, 0);
        }
    }
}

function Snake() {
    this.x = floor(floor(width/PSIZE)/2)*PSIZE;  // Put user initial pos on same grid as defined for food
    this.y = floor(floor(height/PSIZE)/2)*PSIZE; // ...it's the closest grid position near center

    this.total = 0; // Current tail length
    this.tail = []; // Array of tail positions

    this.dir = function(vx, vy) {
        this.xSpeed = vx;
        this.ySpeed = vy;
    }

    // Initial movement direction
    this.dir(SPEED,0)

    this.eat = function() {
        if (dist(this.x, this.y, food.x, food.y) < 1) {
            food.pickLocation();
            this.total = this.total+1;
        }
    }

    this.die = function() {
        for(var ii = 0; ii < this.tail.length; ii++){
            if(dist(this.x, this.y, this.tail[ii].x, this.tail[ii].y)<1){
                this.total = 0;
                this.tail = [];
                break;
            }
        }
    }

    this.wallCollision = function() {
        if((this.y === 0) && (this.ySpeed === -SPEED)){
            if(this.x === 0){
                this.dir(SPEED,0);
            } else if(this.x === width-PSIZE){
                this.dir(-SPEED,0);
            } else {
                this.dir(SPEED,0);
            }
        } else if(this.y === height-PSIZE && (this.ySpeed === SPEED)){
            if(this.x === 0){
                this.dir(SPEED,0);
            } else if(this.x === width-PSIZE){
                this.dir(-SPEED,0);
            } else {
                this.dir(-SPEED,0);
            }
        } else if(this.x === 0 && (this.xSpeed === -SPEED)){
            if(this.y === 0){
                this.dir(0,SPEED);
            } else if(this.y === height-PSIZE){
                this.dir(0,-SPEED);
            } else {
                this.dir(0,-SPEED);
            }
        } else if(this.x === height-PSIZE && (this.xSpeed === SPEED)){
            if(this.y === 0){
                this.dir(0,SPEED);
            } else if(this.y === height-PSIZE){
                this.dir(0,-SPEED);
            } else {
                this.dir(0,SPEED);
            }
        }
    }

    this.update = function() {
        if(this.total === this.tail.length) {
            // If snake didn't eat food, shift tail positions so that the furthest away disapears.
            for(var ii = 0; ii < this.tail.length-1; ii++){
                this.tail[ii] = this.tail[ii+1];
            }
        }

        this.tail[this.total-1] = createVector(this.x, this.y);

        this.wallCollision();

        this.x = this.x + this.xSpeed*PSIZE;
        this.y = this.y + this.ySpeed*PSIZE;

    }

    this.show = function() {
        fill(0);
        rect(this.x, this.y, PSIZE, PSIZE);
        for(var ii = 0; ii < this.tail.length; ii++) {
            rect(this.tail[ii].x, this.tail[ii].y, PSIZE, PSIZE);
        }
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
