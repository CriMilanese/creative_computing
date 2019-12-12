function Firework(x, y) {
  this.lifespan = 255;
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D().mult(random(0.3, 1.5));
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.show = function(c) {
    this.lifespan -= this.vel.y*2;
    c.setAlpha(this.lifespan);
    fill(c);
    let sz = floor(random(2, 6));
    ellipse(this.pos.x, this.pos.y, sz, sz);
  }
}
