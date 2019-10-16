//var mic;

var fires = [];
var numberFire = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  for (i = 0; i < numberFire; i++) {
    fires[i] = new Fire();
  }
}

function draw() {
  background(70, 30, 10);
    for (i = 0; i < fires.length; i++) {
        fires[i].display();
        fires[i].move();
    }

}

class Fire {

constructor () {
  this.spread = 80;
  this.x = random(windowWidth/2 - this.spread,
                  windowWidth/2 + this.spread);
  this.y = random(windowHeight, windowHeight - 100);
  this.vx = random(-0.2, 0.2);
  this.vy = random(-3, 0);

  this.display = function() {
    // print("distance: " + distance);
    var distance = int(dist(this.x, this.y, windowWidth/2, windowHeight-100));
    this.opacity = map(distance, 0, windowHeight, 255, 0);
    // print("opacity: " + opacity);
    var yellow = map(this.y/2, 0, windowHeight/8, 0, 40);
    //var density = mic.getLevel();
    //var h = map(density, 0, 1, 20, 50);
    this.fireSize = map(distance, 0, windowHeight, 45, -5);
    noStroke();
    fill(250, yellow, 0, this.opacity-50);
    triangle(this.x, this.y,
      this.x + this.fireSize, this.y,
      this.x + this.fireSize/2, this.y - this.fireSize);

    };

  this.move = function() {
      this.x += this.vx;
      this.y += this.vy;
      if(this.x>windowWidth*4/5 | this.x<windowWidth/5 | this.y<0){
        this.x = random(windowWidth/2 - this.spread,
                        windowWidth/2 + this.spread);
        this.y = random(windowHeight, windowHeight - 100);
      }
    };
  }
}
