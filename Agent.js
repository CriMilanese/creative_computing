/*
* agents are independent elements on the canvas that have a target
* at position tx, ty and move towards it
*/
function Agent(tx, ty, radius){
  this.pos = createVector(random(gridWidth), random(gridHeight));
  this.target = createVector(tx, ty);
  this.vel = p5.Vector.random2D();
  this.done = false;
  this.r = radius;
  this.acc = 10;
  // possible states are idle or 's' for showing
  this.state = 'idle';

  this.updateAcc = function(){
    this.acc *= 0.8;
  }

  this.update = function(speed){
    this.vel = p5.Vector.sub(this.target, this.pos);
    this.updateAcc();
    if(this.vel.mag() > speed){
      this.vel.normalize().mult(speed).add(this.acc);
    } else {
      this.done = true;
    }
  }

  this.move = function(spd){
    if(this.state != 'mov'){
      this.state = 'mov';
    }
    if(!this.done){
      this.update(spd);
      this.pos.add(this.vel);
    } else {
      if(this.state != 'idle') {
        this.state = 'idle';
      }
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

  this.applyForce = function() {
  }
}
