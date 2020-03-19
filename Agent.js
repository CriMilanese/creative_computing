/*
* agents are independent elements on the canvas that have a target
* at position tx, ty and move towards it
*/
function Agent(tx, ty, radius, scale_t){
  this.pos = createVector(random(windowWidth), random(windowHeight));
  this.target = createVector(tx, ty);
  this.vel = p5.Vector.random2D();
  this.done = false;
  this.r = radius*scale_t;

  this.update = function(){
    this.vel = p5.Vector.sub(this.target, this.pos);
    if(this.vel.mag() > 55){
      this.vel.normalize().mult(55);
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
    fill(102, 34, 27);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  this.responsive = function(wW, wH){
    ratio = wW/wH;
    this.pos = this.target.copy().mult(ratio);
  }
}
