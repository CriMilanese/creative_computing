let alpha = [];
let max_length = 256;
let cyph = false;


function setup(){
  cnv = createCanvas(windowWidth,windowHeight);

  // compose the unicode decimal numbers corresponding to each of the
  // hangul characters
  for(let i=0; i<max_length; i++){
    alpha[i] = new Character(4352 + i, // decimal unicode
                             random(0, windowWidth), // x
                             random(0, windowHeight), // y
                             random(-5, 5), // vx
                             random(-5, 5), // vy
                             15, // initial size
                             color(random(255), random(255), random(255)))
  }
}

function draw(){
  background(255);
  for(let i=0; i<max_length; i++){
    alpha[i].move();
    alpha[i].render();
  }
}

function Character(unicode, x, y, vx, vy, sz, c) {
  this.u = unicode;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.sz = sz;
  this.c = c;

  this.move = function() {
    this.x += this.vx;
    if (this.x>windowWidth | this.x<0) this.vx = -this.vx;

    this.y += this.vy;
    if (this.y>windowHeight | this.y<0) this.vy = -this.vy;

    if (mouseIsPressed) {
      let xdif = abs(this.x-mouseX);
      let ydif = abs(this.y-mouseY);

      if (xdif < 50 && ydif < 50) {
        this.sz = this.sz + (45 - Math.sqrt((xdif*xdif) + (ydif*ydif)));
      }
    }
  }

  this.render = function() {
    textSize(this.sz);
    fill(this.c);
    text(String.fromCharCode(this.u), this.x, this.y);
  }
}
