function Agent(x, y){
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.angle = 8;
  this.radius = 10;
  this.maxSpeed = 5;
  this.maxForce = 1;
  this.c = color(random(255), random(255), random(255));
}

// change its acceleration (and therefore speed) based on distance from target
// increment angle of rotation
Agent.prototype.update = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
  this.angle  += PI/60;
  if(this.angle > 2*PI){
    angle=0;
  }
}

// draw a triangle and its shadow
Agent.prototype.show = function(){
  let b = createVector(this.radius*cos(PI/6), this.radius*sin(PI/6));
  let a = createVector(this.radius*cos(PI*5/6), this.radius*sin(PI*5/6));
  let c = createVector(this.radius*cos(PI*3/2), this.radius*sin(PI*3/2));
  noStroke();
  push();
  translate(this.pos.x+2, this.pos.y+2);
  rotate(this.angle);
  fill(0, 0, 0, 50);
  triangle(a.x, a.y, b.x, b.y, c.x, c.y);
  pop();
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.angle);
  fill(this.c);
  triangle(a.x, a.y, b.x, b.y, c.x, c.y);
  pop();
}

// calculate vector towards target
// limit the speed based on distance from target
Agent.prototype.seek = function(t){
  var desired = p5.Vector.sub(t, this.pos);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if(d < 400){
    speed = map(d, 0, 400, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce)
  return steer;
}

Agent.prototype.behave = function(){
  var pointTo = this.seek(this.target);
  this.force(pointTo);
}

Agent.prototype.force = function(f){
  this.acc.add(f);
}
