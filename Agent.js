/*
* agents are independent elements on the canvas that have a target
* at position tx, ty and move towards it
*/
function Agent(tx, ty, radius){
  this.pos = createVector(random(gridWidth), random(gridHeight));
  this.target = createVector(tx, ty);
  this.acceleration = createVector();
  this.vel = p5.Vector.random2D();
  this.done = false;
  this.r = radius;
  // possible states are idle or 's' for showing
  this.state = 'idle';

  this.update = function(speed){
    this.vel = p5.Vector.sub(this.target, this.pos);
    this.acceleration.mult(0.8);
    if(this.vel.mag() > speed){
      this.vel.normalize().mult(speed).add(this.acceleration);
    } else {
      this.done = true;
    }
  }

  this.move = function(spd){
    if(this.state != 'mov'){
      this.state = 'mov';
    }
    this.update(spd);
    this.pos.add(this.vel);
    if(this.state != 'idle') {
      this.state = 'idle';
    }
  }

  this.show = function(){
    if(this.state != 'show'){
      this.state = 'show';
    }
    fill(102, 34, 27);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
