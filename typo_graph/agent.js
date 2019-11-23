function Agent(x, y){
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxSpeed = 5;
}

Agent.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Agent.prototype.show = function(){
  stroke(255);
  strokeWeight(3);
  ellipse(this.pos.x, this.pos.y, 3, 3);
}

Agent.prototype.seek = function(t){
  var desired = p5.Vector.sub(t, this.pos);
  desired.limit(this.maxSpeed);
  var steer = p5.Vector.sub(desired, this.vel);
  return steer;
}

Agent.prototype.behave = function(){
  var pointTo = this.seek(this.target);
  this.force(pointTo);
}

Agent.prototype.force = function(f){
  this.acc.add(f);
}
