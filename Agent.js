/*
* agents are independent elements on the canvas that have a target
* at position tx, ty and move towards it
*/
function Agent(tx, ty, radius){
  this.pos = createVector(random(gridWidth), random(gridHeight));
  this.target = createVector(tx, ty);
  this.acc = createVector();
  this.vel = p5.Vector.random2D();
  this.done = false;
  this.r = radius;

  this.updateBehavior = function(mode, speed){
    switch(mode){
      case 'wonder':
        this.vel = p5.Vector.sub(this.target, this.pos);
        this.vel.normalize().mult(speed).rotate(3);
        break;
      case 'arrive':
        this.vel = p5.Vector.sub(this.target, this.pos);
        this.acc.mult(0.8);
        if(this.vel.mag() > speed/2){
          this.vel.normalize().mult(speed).add(this.acc);
        // } else {
          // this.done = true;
        }
        break;
      default:
        break;
    }
  }

  this.move = function(mode, speed){
    this.updateBehavior(mode, speed);
    this.pos.add(this.vel);
  }

  this.show = function(){
    fill(102, 34, 27);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  this.applyForce = function(factor){
    this.acc.add(factor)
  }
}
