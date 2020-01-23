/*
* agents are independent elements on the canvas that have a target
* at position tx, ty and move towards it
*/
function Agent(tx, ty, radius){
  this.pos = createVector(random(windowWidth), random(windowHeight));
  this.target = createVector(tx, ty);
  this.vel = p5.Vector.random2D();
  this.acc = createVector(1, 1);
  this.done = false;
  this.r = radius;

  this.update = function(){
    this.vel = p5.Vector.sub(this.target, this.pos);
    if(this.vel.mag() > 25){
      this.vel.normalize().mult(25);
    } else {
      this.done = true;
    }
  }

  this.move = function(){
    if(!this.done){
      this.update();
      this.pos.add(this.vel);
    }
  }

  this.show = function(){
    fill(201,25,0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
