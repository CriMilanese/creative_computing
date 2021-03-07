/*
 * agents are independent elements on the canvas that have a target
 * at position tx, ty and move towards it
 */
function Agent(tx, ty, radius) {
  this.pos = createVector(random(cellWidth), random(cellHeight));
  this.target = createVector(tx, ty);
  this.acc = createVector();
  this.vel = p5.Vector.random2D();
  this.angle = int(random(-5, 5))
  this.done = false;
  this.r = radius;

  this.updateTarget = function(tx, ty) {
    this.target = createVector(tx, ty);
  }

  this.updateBehavior = function(mode, speed) {
    switch (mode) {
      case 'arrive':
        this.vel = p5.Vector.sub(this.target, this.pos);
        this.acc.mult(0.8);
        if (this.vel.mag() > speed/2) {
          this.vel.normalize().mult(speed).add(this.acc);
        } else {
          this.done = true;
        }
        break;
      case 'wonder':
        push();
        translate(this.pos.x, this.pos.y);
        let nextTarget = p5.Vector.random2D();
        this.vel = p5.Vector.sub(nextTarget, this.pos);
        this.vel.normalize().mult(speed).rotate(this.angle);
        pop();
        break;
      case 'bomb':
        this.vel = p5.Vector.sub(this.target, this.pos);
        this.acc.mult(0.8);
        this.vel.normalize().mult(speed).add(this.acc);
        break;
      default:
        break;
    }
  }

  this.move = function(mode, speed) {
    this.updateBehavior(mode, speed);
    this.pos.add(this.vel);
  }

  this.show = function() {
    fill(102, 34, 27);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  this.applyForce = function(factor) {
    this.acc.add(factor)
  }

  this.undo = function(){
    this.done = false;
  }
}
